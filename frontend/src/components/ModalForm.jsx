import { useState, useEffect } from "react";

export default function ModalForm({
  isOpen,
  onClose,
  mode,
  OnSubmit,
  employeeData,
}) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [rate, setRate] = useState("");
  const [status, setStatus] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Active");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const employeeData = {
        name,
        job,
        phone,
        email,
        rate: Number(rate),
        isactive: status,
      };
      await OnSubmit(employeeData);
      onClose(e);
    } catch (error) {
      console.error("Error adding employee: ", error);
    }
  };

  useEffect(() => {
    if (mode === "edit" && employeeData) {
      setName(employeeData.name);
      setJob(employeeData.job);
      setPhone(employeeData.phone);
      setEmail(employeeData.email);
      setRate(employeeData.rate.toString());
      setStatus(employeeData.isactive);
    } else {
      setName("");
      setJob("");
      setPhone("");
      setEmail("");
      setRate("");
      setStatus(false);
    }
  }, [mode, employeeData]);

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_1" className="modal" open={isOpen}>
        <div className="modal-box">
          <h3 className="font-bold text-lg py-4">
            {mode === "edit" ? "Edit Employee" : "Add Employee"}
          </h3>

          <div className="modal-action flex items-center flex-col w-full">
            <form method="dialog" onSubmit={handleSubmit}>
              {/* if there is a button in form, it will close the modal */}
              <label className="input input-bordered my-4 flex w-full gap-2">
                Name
                <input
                  type="text"
                  className="grow"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="input input-bordered my-4 flex w-full gap-2">
                Job
                <input
                  type="text"
                  className="grow"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                />
              </label>
              <label className="input input-bordered my-4 flex w-full gap-2">
                Phone
                <input
                  type="text"
                  className="grow"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <label className="input input-bordered my-4 flex w-full gap-2">
                Email
                <input
                  type="text"
                  className="grow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <div className="flex justify-between items-center mb-4 my-4 w-full">
                <label className="input input-bordered my-4 flex items-center gap-2">
                  Rate
                  <input
                    type="text"
                    className="grow"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                </label>

                <select
                  className="select select-primary my-4"
                  value={status ? "Active" : "Inactive"}
                  onChange={handleStatusChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <button type="button" className="btn" onClick={onClose}>
                Close
              </button>

              <button className="btn btn-success">
                {mode === "edit" ? "Save" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
