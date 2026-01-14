import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import UnavailabilityModal from "../components/UnavailabilityModal.jsx";

const API_BASE = "http://localhost:3000/api/availability";

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUnavailabilityModal, setShowUnavailabilityModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/employees");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  // Fetch unavailability
  const fetchAvailability = async () => {
    try {
      setLoading(true);
      console.log("🟡 Fetching availability from API...");

      const res = await fetch(API_BASE);
      console.log("🟡 Response status:", res.status);

      const data = await res.json();
      setAvailability(data);
      console.log("🟢 Availability data received:", data);
      console.log("🟢 Is array:", Array.isArray(data));
    } catch (err) {
      console.error(err);
      setError("Failed to fetch availability");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAvailability();
  }, []);

  // Map availability rows to FullCalendar events
  console.log("🟡 availability state BEFORE mapping:", availability);

  const events = availability.map((a) => {
    const employeeName = a.name || `Employee ${a.employee_id}`;

    // ✅ Strip timestamp → YYYY-MM-DD
    const dateStr = a.date.split("T")[0];

    const [startH, startM] = a.start_time.split(":").map(Number);
    const [endH, endM] = a.end_time.split(":").map(Number);

    const start = new Date(`${dateStr}T00:00:00`);
    start.setHours(startH, startM, 0, 0);

    const end = new Date(`${dateStr}T00:00:00`);
    end.setHours(endH, endM, 0, 0);

    console.log("🟢 Computed dates:", {
      dateStr,
      start,
      end,
      isStartValid: !isNaN(start),
      isEndValid: !isNaN(end),
    });

    return {
      title: employeeName,
      start,
      end,
      extendedProps: {
        id: a.id,
        employee_id: a.employee_id,
        date: dateStr,
        start_time: a.start_time,
        end_time: a.end_time,
      },
    };
  });

  const onSave = async (data) => {
    try {
      // Prevent duplicates per employee/date
      const duplicate = availability.find(
        (a) =>
          a.employee_id === Number(data.employee_id) &&
          a.date === data.date &&
          (!selectedEvent || a.id !== selectedEvent.id)
      );

      if (duplicate) {
        alert("This employee is already unavailable on this date.");
        return;
      }

      const res = await fetch(
        `${API_BASE}/${selectedEvent ? selectedEvent.id : ""}`,
        {
          method: selectedEvent ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) throw new Error("Failed to save unavailability");

      await fetchAvailability();
      setShowUnavailabilityModal(false);
      setSelectedEvent(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save unavailability");
    }
  };

  const onDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");

      await fetchAvailability(); // refresh calendar
      setShowUnavailabilityModal(false);
      setSelectedEvent(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete unavailability");
    }
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <h1>Employee Unavailability Calendar</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        className="btn btn-primary mb-4"
        onClick={() => {
          setSelectedEvent(null);
          setShowUnavailabilityModal(true);
        }}
      >
        Add Unavailability
      </button>

      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        allDaySlot={false}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        events={events}
        eventDidMount={(info) => {
          console.log("🟢 Event rendered on calendar:", info.event.title);
        }}
        height="auto"
        eventClick={(info) => {
          setSelectedEvent(info.event.extendedProps);
          setShowUnavailabilityModal(true);
        }}
      />

      {showUnavailabilityModal && (
        <UnavailabilityModal
          isOpen={showUnavailabilityModal}
          initialData={selectedEvent}
          employees={employees}
          onClose={() => {
            setShowUnavailabilityModal(false);
            setSelectedEvent(null);
          }}
          onSave={onSave}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
