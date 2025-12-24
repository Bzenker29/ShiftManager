import { useEffect, useState } from "react";
import axios from "axios";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function EmployeeAvailability({ employeeId }) {
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/availability/${employeeId}`)
      .then((res) => {
        const mapped = {};
        res.data.forEach((a) => {
          mapped[a.day_of_week] = {
            start: a.start_time,
            end: a.end_time,
          };
        });
        setAvailability(mapped);
      });
  }, [employeeId]);

  const handleChange = (day, field, value) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const saveDay = async (day) => {
    const dayData = availability[day];
    if (!dayData?.start || !dayData?.end) return;

    await axios.post(`http://localhost:3000/api/availability/${employeeId}`, {
      dayOfWeek: day,
      startTime: dayData.start,
      endTime: dayData.end,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Weekly Availability</h2>

      {days.map((day, index) => (
        <div key={day} className="flex items-center gap-4">
          <div className="w-24">{day}</div>

          <input
            type="time"
            value={availability[index]?.start || ""}
            onChange={(e) => handleChange(index, "start", e.target.value)}
            className="input input-bordered"
          />

          <input
            type="time"
            value={availability[index]?.end || ""}
            onChange={(e) => handleChange(index, "end", e.target.value)}
            className="input input-bordered"
          />

          <button
            className="btn btn-sm btn-primary"
            onClick={() => saveDay(index)}
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
}
