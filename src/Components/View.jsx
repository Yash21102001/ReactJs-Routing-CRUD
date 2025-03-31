import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const View = () => {
  const [EmpData, setEmpData] = useState(() => {
    let emp = localStorage.getItem("emp");
    return emp ? JSON.parse(emp) : [];
  });

  const [perPage, setPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [virtualEmp, setVirtualEmp] = useState([]);

  useEffect(() => {
    let lastIndex = perPage * currentPage;
    let firstIndex = lastIndex - perPage;

    let newEmp = [...EmpData];
    let pages = Math.ceil(newEmp.length / perPage);
    setTotalPages(pages);
    setVirtualEmp(newEmp.slice(firstIndex, lastIndex));
  }, [currentPage, EmpData]);

  const handleDelete = (e, id) => {
    e.preventDefault();
    let updatedEmp = JSON.parse(localStorage.getItem("emp"));
    updatedEmp = updatedEmp.filter((emp) => emp.id !== id);
    setEmpData(updatedEmp);
    localStorage.setItem("emp", JSON.stringify(updatedEmp));
  };

  const handleFilter = (e) => {
    let data = localStorage.getItem("emp");
    data = data ? JSON.parse(data) : [];

    const filterVal = e.target.value.toLowerCase();
    if (filterVal) {
      data = data.filter((emp) =>
        emp.name.toLowerCase().includes(filterVal)
      );
    }

    setEmpData(data);
  };

  const handleSorting = (e) => {
    e.preventDefault();
    let sorted = [...EmpData];

    if (e.target.value === "asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (e.target.value === "desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (e.target.value === "reset") {
      sorted.sort((a, b) => a.id - b.id);
    }

    setEmpData(sorted);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700">
        <h2 className="text-4xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          Employee Data
        </h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            onChange={handleFilter}
            className="w-full md:w-1/3 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />

          <select
            name="sorting"
            onChange={handleSorting}
            className="w-full md:w-1/4 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="" disabled className="bg-gray-800 text-gray-400">-- Sort --</option>
            <option value="asc" className="bg-gray-800">Ascending (A-Z)</option>
            <option value="desc" className="bg-gray-800">Descending (Z-A)</option>
            <option value="reset" className="bg-gray-800">Reset</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="min-w-full bg-gray-700/50 backdrop-blur-sm">
            <thead className="bg-gray-700/50 text-cyan-100">
              <tr>
                <th className="px-6 py-4 text-left">Image</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Gender</th>
                <th className="px-6 py-4 text-left">Hobby</th>
                <th className="px-6 py-4 text-left">City</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {virtualEmp.map((emp, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-700 hover:bg-gray-700/30 transition"
                >
                  <td className="px-6 py-4">
                    <div className="relative group">
                      <img 
                        src={emp.image} 
                        alt={emp.name} 
                        className="w-16 h-16 rounded-lg object-cover border-2 border-gray-600 group-hover:border-cyan-400 transition-all"
                      />
                      <div className="absolute inset-0 bg-black/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs">Preview</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{emp.name}</td>
                  <td className="px-6 py-4 text-white">{emp.email}</td>
                  <td className="px-6 py-4 text-white capitalize">{emp.gender}</td>
                  <td className="px-6 py-4 text-white">{emp.hoby?.join(", ")}</td>
                  <td className="px-6 py-4 text-white">{emp.city}</td>
                  <td className="px-6 py-4 space-x-3">
                    <button
                      onClick={(e) => handleDelete(e, emp.id)}
                      className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-4 py-2 rounded-lg text-white text-sm shadow-lg hover:shadow-red-500/20 transition-all"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/edit/${emp.id}`}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-4 py-2 rounded-lg text-white text-sm shadow-lg hover:shadow-cyan-500/20 transition-all"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
            className={`px-6 py-3 rounded-xl text-white font-medium shadow-lg transition-all ${currentPage === 1 ? 'bg-gray-700 cursor-not-allowed opacity-70' : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/20'}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="text-cyan-100">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              currentPage !== totalPages && setCurrentPage(currentPage + 1)
            }
            className={`px-6 py-3 rounded-xl text-white font-medium shadow-lg transition-all ${currentPage === totalPages ? 'bg-gray-700 cursor-not-allowed opacity-70' : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/20'}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;