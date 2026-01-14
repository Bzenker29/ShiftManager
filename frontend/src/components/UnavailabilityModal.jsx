import { useState, useEffect } from "react";

export default function UnavailabilityModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData,
  employees = [],
}) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [availabilityId, setAvailabilityId] = useState(null); // NEW: row id

  // Initialize form when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (initialData) {
      setEmployeeId(initialData.employee_id || "");
      setDate(initialData.date || "");
      setStartTime(initialData.start_time || "");
      setEndTime(initialData.end_time || "");
      setAvailabilityId(initialData.id || null); // store the id for edits
    } else {
      setEmployeeId("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setAvailabilityId(null);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const normalizeTime = (time) => (time.length === 5 ? `${time}:00` : time);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      id: availabilityId,
      employee_id: Number(employeeId),
      date, // YYYY-MM-DD
      start_time: normalizeTime(startTime),
      end_time: normalizeTime(endTime),
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
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: "2rem",
          borderRadius: "0.5rem",
          minWidth: "320px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
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
        <div className="mb-4">
          <label>
            Date Unavailable:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>
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
        <div className="flex justify-between items-center mt-6 gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition"
          >
            Save
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow transition"
          >
            Cancel
          </button>

          {initialData && (
            <button
              type="button"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow transition"
              onClick={() => {
                if (
                  confirm(
                    "Are you sure you want to delete this unavailability?"
                  )
                ) {
                  onDelete(initialData.id);
                }
              }}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
