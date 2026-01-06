import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";

const API_BASE = "http://localhost:3000/api/availability";
const dayLabels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch employees
  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:3000/api/employees");
    const data = await res.json();
    setEmployees(data);
  };

  // Fetch availability/unavailability
  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_BASE);
      const data = await res.json();
      setAvailability(data);
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

  // Map availability to FullCalendar events
  const events = availability.map((a) => {
    const employeeName = a.name || `Employee ${a.employee_id}`;

    // Create a dummy date (2026-01-04 = Sunday) and offset by day_of_week
    const baseDate = new Date("2026-01-04");
    const dayDate = new Date(baseDate);
    dayDate.setDate(baseDate.getDate() + a.day_of_week);

    const [startHours, startMinutes] = a.start_time.split(":").map(Number);
    const [endHours, endMinutes] = a.end_time.split(":").map(Number);

    const start = new Date(dayDate);
    start.setHours(startHours, startMinutes);

    const end = new Date(dayDate);
    end.setHours(endHours, endMinutes);

    return {
      title: employeeName,
      start,
      end,
    };
  });

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

      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin]} // keep both plugins
        initialView="dayGridMonth" // start in Month view
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay", // add Month view to toggle
        }}
        allDaySlot={false}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        events={events}
        height="auto"
      />
    </div>
  );
}
