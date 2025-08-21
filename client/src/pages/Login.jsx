import React, { useState } from "react";
import Card1 from "../components/Card1";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(form.email, form.password);
            const redirectTo = location.state?.from?.pathname || "/";
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <Layout>
            <div className="w-full h-[75vh] flex items-center justify-center">
                <Card1
                    className="h-3/4 max-h-96 w-1/3 max-w-md"
                    title="LOGIN"
                    titleClassName="justify-center text-3xl"
                >
                    <form onSubmit={handleSubmit} className="text-gray-900">
                        <label htmlFor="email" className="block font-bold mb-2 text-[#222]">
                            Email
                        </label>
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

                        <label htmlFor="pwd" className="block font-bold mb-2 text-[#222]">
                            Citizen Code
                        </label>
                        <input
                            id="pwd"
                            name="password"
                            className="block w-full px-3 py-2.5 rounded-md border border-black/10 bg-white mb-4 text-sm"
                            type="password"
                            placeholder="Enter Citizen Code"
                            value={form.password}
                            onChange={handleChange}
                        />

                        {error ? (
                            <p className="text-red-600 text-xs mt-1 mb-3">{error}</p>
                        ) : null}

                        <button
                            type="submit"
                            className="block w-full px-3.5 py-2.5 rounded-md bg-dark-orange text-white font-bold text-sm shadow-[0_0.1875rem_0_rgba(0,0,0,0.06)]"
                        >
                            Login
                        </button>

                        {/* <div className="mt-2.5">
                            <a href="#" className="inline-block text-xs text-gray-700 underline opacity-95">
                                Forgot password?
                            </a>
                        </div> */}

                        <p className="text-sm text-gray-600 my-5 italic">
                            Citizen code is a unique identifier for each citizen of United Pingdom of Minet, used to access various services and platforms.If you dont have one yet, please <Link to="/register" className="text-blue-500 underline">register</Link>.
                        </p>

                    </form>
                </Card1>
            </div>
        </Layout>
    );
};

export default Login;