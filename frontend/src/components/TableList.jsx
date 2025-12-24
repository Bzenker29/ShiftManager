import axios from "axios";
import { useState, useEffect } from "react";

export default function TableList({ handleOpen, searchTerm }) {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/employees");
        setTableData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const filterData = tableData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/employees/${id}`);
        setTableData((prevData) =>
          prevData.filter((employee) => employee.id !== id)
        );
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="overflow-x-auto mt-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {filterData.map((employee) => (
              <tr key={employee.id} className="hover:bg-base-300">
                <th>{employee.display_id}</th>
                <td>{employee.name}</td>
                <td>{employee.job}</td>
                <td>{employee.phone}</td>
                <td>
                  <button
                    className={`btn rounded-full w-20 ${
                      employee.isactive ? "btn-success" : "btn-error"
                    }`}
                  >
                    {employee.isactive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-info rounded-full w-20"
                    onClick={() => handleOpen("edit", employee)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning rounded-full w-20"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
