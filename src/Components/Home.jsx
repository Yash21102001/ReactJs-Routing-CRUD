import React, { useEffect, useState } from "react";

const Home = () => {
  const [allEmployees, setAllEmployees] = useState(() => {
    let emp = localStorage.getItem("emp");
    return emp ? JSON.parse(emp) : [];
  });

  const [newEmp, setNewEmp] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    hoby: [],
    city: "",
  });

  const [hobby, setHobby] = useState([]);
  const [city] = useState(["Surat", "Vapi", "Tapi", "Ghandhinagar"]);

  useEffect(() => {
    localStorage.setItem("emp", JSON.stringify(allEmployees));
  }, [allEmployees]);

  const onInputChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (name === "hoby") {
      let updatedHobby = [...hobby];
      if (checked) {
        updatedHobby.push(value);
      } else {
        updatedHobby = updatedHobby.filter((h) => h !== value);
      }
      setHobby(updatedHobby);
      setNewEmp({ ...newEmp, hoby: updatedHobby });
    } else {
      setNewEmp({ ...newEmp, [name]: value });
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!newEmp.name || !newEmp.email) {
      alert("Fill all fields");
      return;
    }

    let newId =
      allEmployees.length > 0 ? Math.max(...allEmployees.map((emp) => emp.id)) + 1 : 1;

    setAllEmployees([...allEmployees, { ...newEmp, id: newId }]);
    setNewEmp({
      name: "",
      email: "",
      password: "",
      gender: "",
      hoby: [],
      city: "",
      image: "",
    });
    setHobby([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          Enter Your Details
        </h2>

        <form onSubmit={onFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-cyan-100">Name:</label>
              <input
                name="name"
                type="text"
                value={newEmp.name}
                onChange={onInputChange}
                className="w-full p-3.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder=""
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-cyan-100">Email:</label>
              <input
                name="email"
                type="email"
                value={newEmp.email}
                onChange={onInputChange}
                className="w-full p-3.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder=""
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-cyan-100">Password:</label>
              <input
                name="password"
                type="password"
                value={newEmp.password}
                onChange={onInputChange}
                className="w-full p-3.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder=""
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-cyan-100">City:</label>
              <select
                name="city"
                value={newEmp.city}
                onChange={onInputChange}
                className="w-full p-3.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">--- Select City ---</option>
                {city.map((c) => (
                  <option key={c} value={c} className="bg-gray-800">
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-gray-700/50 p-5 rounded-xl">
            <label className="block mb-3 text-sm font-medium text-cyan-100">Gender:</label>
            <div className="flex gap-6">
              {["male", "female"].map((gender) => (
                <label key={gender} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={newEmp.gender === gender}
                    onChange={onInputChange}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${newEmp.gender === gender ? "border-cyan-400 bg-cyan-400/20" : "border-gray-500"
                      }`}
                  >
                    {newEmp.gender === gender && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>}
                  </div>
                  <span className="text-white capitalize">{gender}</span>
                </label>
              ))}

            </div>
          </div>

          <div className="bg-gray-700/50 p-5 rounded-xl">
            <label className="block mb-3 text-sm font-medium text-cyan-100">Hobby:</label>
            {["Cricket", "Swiming", "Dancing", "Coding"].map((h) => (
              <label key={h} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="hoby"
                  value={h}
                  checked={newEmp.hoby.includes(h)}
                  onChange={onInputChange}
                  className="hidden"
                />
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${newEmp.hoby.includes(h) ? "border-cyan-400 bg-cyan-400/20" : "border-gray-500"
                    }`}
                >
                  {newEmp.hoby.includes(h) && (
                    <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <span className="text-white">{h}</span>
              </label>
            ))}

          </div>

          <div className="bg-gray-700/50 p-5 rounded-xl">
            <label className="block mb-3 text-sm font-medium text-cyan-100">Online Image:</label>
            {newEmp.image && (
              <div className="mb-4 flex justify-end">
                <div className="relative group">
                  <img
                    src={newEmp.image}
                    alt="Profile"
                    className="w-32 h-32 rounded-xl object-cover border-2 border-gray-600 group-hover:border-cyan-400 transition-all"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs">Preview</span>
                  </div>
                </div>
              </div>
            )}
            <input
              name="image"
              type="text"
              value={newEmp.image}
              onChange={onInputChange}
              className="w-full p-3.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Paste image URL here"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              Submit Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;