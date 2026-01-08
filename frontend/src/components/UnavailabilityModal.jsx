import { useState, useEffect } from "react";

export default function UnavailabilityModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  employees = [],
}) {
  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const dayLabels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Initialize form when modal opens
  useEffect(() => {
    if (!isOpen) return;
    if (initialData) {
      setDayOfWeek(initialData.day_of_week || 0);
      setStartTime(initialData.start_time || "");
      setEndTime(initialData.end_time || "");
    } else {
      setDayOfWeek(0);
      setStartTime("");
      setEndTime("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass employeeId along with times
    onSave({
      employee_id: employeeId,
      day_of_week: dayOfWeek,
      start_time: startTime,
      end_time: endTime,
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)", // overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000, // below form
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#ffffff", // solid white instead of CSS variable
          color: "#000000", // make text readable
          padding: "2rem",
          borderRadius: "0.5rem",
          minWidth: "320px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)", // subtle shadow for contrast
          zIndex: 1001,
        }}
      >
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Unavailability" : "Add Unavailability"}
        </h2>
        <div className="mb-4">
          <label>
            Employee:
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <br />
        <div className="mb-4">
          <label>
            Day of Week:
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(parseInt(e.target.value))}
              required
            >
              {dayLabels.map((d, i) => (
                <option key={i} value={i}>
                  {d}
                </option>
              ))}
            </select>
          </label>
        </div>
        <br />
        <div className="mb-4">
          <label>
            Start Time:
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </label>
        </div>
        <br />
        <div className="mb-4">
          <label>
            End Time:
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </label>
        </div>
        <br />

        <button type="submit" style={{ marginRight: "1rem" }}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}
