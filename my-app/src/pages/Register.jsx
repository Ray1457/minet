import React, { useState } from "react";
import Card1 from "../components/Card1";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) return;
        await register(form.email, form.password);
        navigate("/");
    };

    return (
        <Layout>
            <div className="w-full h-[75vh] flex items-center justify-center">
                <Card1
                    className="h-4/5 max-h-[30rem] w-1/3 max-w-md"
                    title="REGISTER"
                    titleClassName="justify-center text-3xl"
                >
                    <form onSubmit={handleSubmit} className="text-gray-900">
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

                        <label htmlFor="pwd" className="block font-bold mb-2 text-[#222]">Password</label>
                        <input
                            id="pwd"
                            name="password"
                            className="block w-full px-3 py-2.5 rounded-md border border-black/10 bg-white mb-2 text-sm"
                            type="password"
                            placeholder="Enter Password"
                            value={form.password}
                            onChange={handleChange}
                        />

                        <label htmlFor="confirmPwd" className="block font-bold mb-2 text-[#222]">Confirm Password</label>
                        <input
                            id="confirmPwd"
                            name="confirmPassword"
                            className="block w-full px-3 py-2.5 rounded-md border border-black/10 bg-white mb-1 text-sm"
                            type="password"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                        {form.confirmPassword && form.password !== form.confirmPassword ? (
                            <p className="text-red-600 text-xs mt-1">Passwords do not match.</p>
                        ) : null}

                        <button
                            type="submit"
                            className="block w-full px-3.5 py-2.5 mt-5 rounded-md bg-dark-orange text-white font-bold text-sm shadow-[0_0.1875rem_0_rgba(0,0,0,0.06)]"
                            disabled={form.password !== form.confirmPassword}
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