import React, { useState } from "react";
import Card1 from "../components/Card1";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", age: "", address: "", phone: "", profilePicture: null });
    const [error, setError] = useState("");
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePicture') {
            setForm({ ...form, profilePicture: files && files[0] ? files[0] : null });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (form.password !== form.confirmPassword) return;
        try {
            await register({
                name: form.name,
                email: form.email,
                password: form.password,
                age: form.age ? Number(form.age) : undefined,
                address: form.address || undefined,
                phone: form.phone || undefined,
                profilePicture: form.profilePicture || undefined,
            });
            navigate("/");
        } catch (err) {
            setError(err.message || "Registration failed");
        }
    };

    return (
        <Layout>
            <div className="w-full h-[75vh] flex items-center justify-center">
                <Card1
                    className="h-4/5 max-h-[30rem] w-1/3 max-w-md"
                    panelClassName="h-full w-full overflow-y-auto register-scroll"
                    title="REGISTER"
                    titleClassName="justify-center text-3xl"                >
                    <form onSubmit={handleSubmit} className="text-gray-900" autoComplete="off">
                        <label htmlFor="name" className="block font-bold mb-2 text-[#222]">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            className="block w-full px-3 py-2.5 rounded-md border border-black/10 bg-white mb-4 text-sm"
                            type="text"
                            placeholder="Enter Full Name"
                            value={form.name}
                            onChange={handleChange}
                            autoComplete="off"
                        />

                        <label htmlFor="email" className="block font-bold mb-2 text-[#222]">Email</label>
                        <input
                            id="email"
                            name="email"
                            className="block w-full px-3 py-2.5 rounded-md border border-black/10 bg-white mb-4 text-sm"
                            type="email"
                            placeholder="Enter Email"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="off"
                        />

                        <label htmlFor="age" className="block font-bold mb-2 text-[#222]">Age</label>
                        <input
                            id="age"
                            name="age"
                            className="block w-full px-3 py-2.5 rounded-md border border-black/10 bg-white mb-4 text-sm"
                            type="number"
                            placeholder="Enter Age "
                            value={form.age}
                            onChange={handleChange}
                            min={0}
                            autoComplete="off"
                        />

                        <label htmlFor="address" className="block font-bold mb-2 text-[#222]">Address</label>
                        <input
                            id="address"
                            name="address"
                            className="block w-full px-3 py-2.5 rounded-md border border-black/10 bg-white mb-4 text-sm"
                            type="text"
                            placeholder="Enter Address "
                            value={form.address}
                            onChange={handleChange}
                            autoComplete="off"
                        />

                        <label htmlFor="phone" className="block font-bold mb-2 text-[#222]">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            className="block w-full px-3 py-2.5 rounded-md border border-black/10 bg-white mb-4 text-sm"
                            type="tel"
                            placeholder="Enter Phone "
                            value={form.phone}
                            onChange={handleChange}
                            autoComplete="off"
                        />

                        <label htmlFor="profilePicture" className="block font-bold mb-2 text-[#222]">Profile Picture</label>
                        <input
                            id="profilePicture"
                            name="profilePicture"
                            className="block w-full px-3 py-2.5 rounded-md border border-black/10 bg-white mb-4 text-sm"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                            autoComplete="off"
                        />

                        {error ? (
                            <p className="text-red-600 text-xs mt-2">{error}</p>
                        ) : null}

                        <button
                            type="submit"
                            className="block w-full px-3.5 py-2.5 mt-5 rounded-md bg-dark-orange text-white font-bold text-sm shadow-[0_0.1875rem_0_rgba(0,0,0,0.06)]"

                        >
                            Register
                        </button>

                        <div className="mt-5">
                            <Link to="/login" className="inline-block text-xs text-gray-700 underline opacity-95">
                                Already have an account? Login
                            </Link>
                        </div>
                    </form>
                </Card1>
            </div>
        </Layout>
    );
};

export default Register;