import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as Actions from "../../store/actions/userActions";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.auth);

    // Redirect authenticated users to the home page
    useEffect(() => {
        if (isAuth) {
            navigate("/home");
        }
    }, [isAuth, navigate]);

    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleInputChange = ({ target: { name, value } }) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(Actions.login(formData));
        setFormData({ email: "", password: "" });
    };

    return (
        <section className="px-5 lg:px-0">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
                <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                    Hello! <span className="text-primaryColor">Welcome</span> Back
                </h3>

                <form className="py-4 md:py-0" onSubmit={submitHandler}>
                    {/* Email Input */}
                    <InputField
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Enter Your Email"
                        onChange={handleInputChange}
                    />

                    {/* Password Input */}
                    <InputField
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="Password Here"
                        onChange={handleInputChange}
                    />

                    {/* Submit Button */}
                    <div className="mt-7">
                        <button
                            type="submit"
                            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                        >
                            Login
                        </button>
                    </div>

                    {/* Register Link */}
                    <p className="mt-5 text-textColor text-center">
                        Don&apos;t have an account?
                        <Link to="/register" className="text-primaryColor font-medium ml-1">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

// Reusable InputField Component
const InputField = ({ type, name, value, placeholder, onChange }) => (
    <div className="mb-5">
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            required
        />
    </div>
);

export default Login;