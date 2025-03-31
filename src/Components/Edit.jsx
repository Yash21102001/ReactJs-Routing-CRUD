import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  let { index } = useParams();
  let navigate = useNavigate();

  const [allEmplogees, setAllEmplogees] = useState(() => {
    let emp = localStorage.getItem("emp");
    return emp ? JSON.parse(emp) : [];
  });

  const [emp, setEmp] = useState(() => {
    let indexData = allEmplogees.findIndex((v) => v.id === parseInt(index));
    return allEmplogees[indexData] || {};
  });

  const [hobby, setHobby] = useState(emp.hoby || []);
  const [city] = useState(["Surat", "Vapi", "Tapi", "Ghandhinagar"]);

  useEffect(() => {
    localStorage.setItem("emp", JSON.stringify(allEmplogees));
  }, [allEmplogees]);

  const onInputChange = (e) => {
    if (e.target.name === "hoby") {
      let hoby = [...hobby];
      if (e.target.checked) {
        hoby.push(e.target.value);
      } else {
        hoby = hoby.filter((h) => h !== e.target.value);
      }
      setHobby(hoby);
      setEmp({ ...emp, [e.target.name]: hoby });
      return;
    }
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    let emp = [...allEmplogees];
    let indexData = emp.findIndex((v) => v.id === parseInt(index));
    emp[indexData] = emp;
    setAllEmplogees([...emp]);
    navigate("/view");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6 py-10">
      <div className="min-h-52 max-w-4xl w-full bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Edit Employee Details
        </h2>
        <form onSubmit={onFormSubmit}>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={emp.name || ""}
            onChange={onInputChange}
            className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={emp.email || ""}
            onChange={onInputChange}
            className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block mb-2">Password:</label>
          <input
            type="text"
            name="password"
            value={emp.password || ""}
            onChange={onInputChange}
            className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="block mb-2">Gender:</label>
          <div className="flex gap-4 mb-4">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={emp.gender === "male"}
                onChange={onInputChange}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={emp.gender === "female"}
                onChange={onInputChange}
              />{" "}
              Female
            </label>
          </div>

          <label className="block mb-2">Hobbies:</label>
          <div className="flex flex-wrap gap-4 mb-4">
            {["Cricket", "Swimming", "Dancing", "Coding"].map((h) => (
              <label key={h}>
                <input
                  type="checkbox"
                  name="hoby"
                  value={h}
                  checked={hobby.includes(h)}
                  onChange={onInputChange}
                />{" "}
                {h}
              </label>
            ))}
          </div>

          <label className="block mb-2">City:</label>
          <select
            name="city"
            value={emp.city || ""}
            onChange={onInputChange}
            className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--- Select City ---</option>
            {city.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label className="block mb-2">Online Image:</label>
          {/* <img src={emp.image} alt="" height={100} width={100} className=''/> */}
          <div className="flex justify-end">
            <img
              src={emp.image}
              alt="Profile"
              className="w-30 h-30 rounded-lg border-2 border-gray-600 mr-4 "
            />
          </div>
          <input
            type="text"
            name="image"
            value={emp.image || ""}
            onChange={onInputChange}
            className="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          /> 
           <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
