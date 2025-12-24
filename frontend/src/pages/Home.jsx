import { useState } from "react";
import axios from "axios";
import TableList from "../components/Tablelist.jsx";
import ModalForm from "../components/Modalform.jsx";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeData, setEmployeeData] = useState(null);

  const handleOpen = (mode, employee = null) => {
    setEmployeeData(employee);
    setModalMode(mode);
    setIsOpen(true);
  };

  const handleSubmit = async (newEmployeeData) => {
    try {
      if (modalMode === "add") {
        await axios.post(
          "http://localhost:3000/api/employees",
          newEmployeeData
        );
      } else {
        await axios.put(
          `http://localhost:3000/api/employees/${employeeData.id}`,
          newEmployeeData
        );
      }
    } catch (error) {
      console.error("Error saving employee:", error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="p-4">
      {/* 🔍 Search + ➕ Add */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search employees"
          className="input input-bordered w-48 md:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="btn btn-primary" onClick={() => handleOpen("add")}>
          Add Employee
        </button>
      </div>

      {/* 📋 Employee table */}
      <TableList handleOpen={handleOpen} searchTerm={searchTerm} />

      {/* 🧾 Modal */}
      <ModalForm
        isOpen={isOpen}
        OnSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        employeeData={employeeData}
      />
    </div>
  );
}
