import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    cgpa: "",
    location: "",
    role: "",
    tgId: "",
    resume: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] }); // store resume file
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // TODO: Replace with API call to backend
    console.log("Registering User:", form);

    // Save temporary user info in localStorage
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="college"
            placeholder="College Name"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.college}
            onChange={handleChange}
          />
          <input
            type="number"
            step="0.01"
            name="cgpa"
            placeholder="CGPA"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.cgpa}
            onChange={handleChange}
          />

          {/* Location Dropdown */}
          <select
            name="location"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.location}
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
          </select>

          {/* Role Dropdown */}
          <select
            name="role"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.role}
            onChange={handleChange}
          >
            <option value="">Select Interested Role</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="ML Engineer">ML Engineer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>

          <input
            type="text"
            name="tgId"
            placeholder="Telegram ID"
            className="w-full px-4 py-2 border rounded-lg"
            value={form.tgId}
            onChange={handleChange}
          />

          {/* Resume Upload */}
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
