import React, { useState } from 'react';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import Action_Constant from "../../constant/actionConstant";

const Register = () => {

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        role: 'student',
    });

    const [btnStatus, setBtnStatus] = useState(false);
    const [alertData, setAlertData] = useState({
        status: "",
        content: ""
    })
    const handleInputChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const submitHandler = async (event) => {
        setBtnStatus(true)
        event.preventDefault();

        try {
            await axios.post(Action_Constant.baseURL + Action_Constant.Auth.Register, registerData).then(res => {
                if (res.data.status === "success") {
                    setAlertData({
                        status: "success",
                        content: res.data.message
                    })
                } else {
                    setAlertData({
                        status: "warning",
                        content: res.data.message
                    })
                }
            })
            setRegisterData({
                name: '',
                email: '',
                password: '',
                gender: '',
                role: 'student',
            })
            setBtnStatus(false);
        } catch (error) {
            setAlertData({
                status: "error",
                content: "Something went Wrong! Please try again later."
            })
        }
    };

    return (
        <>
            <section className="px-5 xl:px-0">
                <div className="max-w-[1170px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="hidden lg:block bg-primaryColor rounded-l-lg">
                            <figure className="rounded-l-lg">
                                <img src="assets/image/register.gif" alt="RegisterGif" className="w-full rounded-l-lg" />
                            </figure>
                        </div>
                        <div className="rounded-l-lg lg:pl-16 py-10">
                            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                                Create An <span className="text-primaryColor">Account</span>
                            </h3>

                            <form onSubmit={submitHandler}>
                                <div className="mb-5">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        name="name"
                                        value={registerData.name}
                                        onChange={handleInputChange}
                                        className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                                        required
                                    />
                                </div>
                                <div className="mb-5">
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        name="email"
                                        value={registerData.email}
                                        onChange={handleInputChange}
                                        className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                                        required
                                    />
                                </div>
                                <div className="mb-5">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={registerData.password}
                                        onChange={handleInputChange}
                                        className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                                        required
                                    />
                                </div>
                                <div className="mb-5 flex items-center justify-between">
                                    <label className="text-headingColor font-bold text-[16px] leading-7">
                                        Are You A:
                                        <select
                                            name="role"
                                            value={registerData.role}
                                            onChange={handleInputChange}
                                            className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                                        >
                                            <option value="facilitator">Facilitator</option>
                                            <option value="student">Student</option>
                                        </select>
                                    </label>
                                    <label className="text-headingColor font-bold text-[16px] leading-7">
                                        Gender:
                                        <select
                                            name="gender"
                                            value={registerData.gender}
                                            onChange={handleInputChange}
                                            className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                                            required
                                        >
                                            <option value=""></option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="mt-7">
                                    <button
                                        type="submit"
                                        onDoubleClick={() => { }}
                                        disabled={btnStatus}
                                        className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                                    >
                                        {btnStatus ? "Sign Up..." : "Sign Up"}
                                    </button>
                                    {alertData?.status?.length !== 0 && (
                                        <Alert severity={alertData?.status}>{alertData?.content}</Alert>
                                    )}
                                </div>
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
        </>
    );
};

export default Register;