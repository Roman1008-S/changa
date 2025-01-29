import React, { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { actionConstants } from "../../constant/actionConstant";

const Register = () => {
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        role: "student",
    });

    const [btnStatus, setBtnStatus] = useState(false);
    const [alertData, setAlertData] = useState({
        status: "",
        content: "",
    });

    // Handle input change
    const handleInputChange = ({ target: { name, value } }) => {
        setRegisterData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const submitHandler = async (event) => {
        event.preventDefault();
        setBtnStatus(true);

        try {
            const response = await axios.post(
                `${actionConstants.baseURL}${actionConstants.authEndpoints.register}`,
                registerData
            );

            const { status, message } = response.data;

            setAlertData({
                status: status || "warning",
                content: message || "Unexpected response from server.",
            });

            if (status === "success") {
                setRegisterData({
                    name: "",
                    email: "",
                    password: "",
                    gender: "",
                    role: "student",
                });
            }
        } catch (error) {
            setAlertData({
                status: "error",
                content: "Something went wrong! Please try again later.",
            });
        } finally {
            setBtnStatus(false);
        }
    };

    return (
        <section className="px-5 xl:px-0">
            <div className="max-w-[1170px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left Side Image */}
                    <div className="hidden lg:block bg-primaryColor rounded-l-lg">
                        <figure className="rounded-l-lg">
                            <img
                                src="assets/image/register.gif"
                                alt="RegisterGif"
                                className="w-full rounded-l-lg"
                            />
                        </figure>
                    </div>

                    {/* Right Side Form */}
                    <div className="rounded-l-lg lg:pl-16 py-10">
                        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                            Create An <span className="text-primaryColor">Account</span>
                        </h3>

                        <form onSubmit={submitHandler}>
                            {/* Name Input */}
                            <InputField
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={registerData.name}
                                onChange={handleInputChange}
                            />

                            {/* Email Input */}
                            <InputField
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                                value={registerData.email}
                                onChange={handleInputChange}
                            />

                            {/* Password Input */}
                            <InputField
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={handleInputChange}
                            />

                            {/* Role and Gender Selection */}
                            <div className="mb-5 flex items-center justify-between">
                                <SelectField
                                    label="Are You A:"
                                    name="role"
                                    value={registerData.role}
                                    onChange={handleInputChange}
                                    options={[
                                        { value: "facilitator", label: "Facilitator" },
                                        { value: "student", label: "Student" },
                                    ]}
                                />

                                <SelectField
                                    label="Gender:"
                                    name="gender"
                                    value={registerData.gender}
                                    onChange={handleInputChange}
                                    options={[
                                        { value: "", label: "Select Gender" },
                                        { value: "male", label: "Male" },
                                        { value: "female", label: "Female" },
                                    ]}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="mt-7">
                                <button
                                    type="submit"
                                    disabled={btnStatus}
                                    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                                >
                                    {btnStatus ? "Signing Up..." : "Sign Up"}
                                </button>

                                {/* Alert for Success/Error */}
                                {alertData?.status && (
                                    <Alert severity={alertData.status}>{alertData.content}</Alert>
                                )}
                            </div>

                            {/* Login Redirect */}
                            <p className="mt-5 text-textColor text-center">
                                Already have an account?
                                <Link to="/login" className="text-primaryColor font-medium ml-1">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const InputField = ({ type, name, placeholder, value, onChange }) => (
    <div className="mb-5">
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
        />
    </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
    <label className="text-headingColor font-bold text-[16px] leading-7">
        {label}
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
            required
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </label>
);

export default Register;