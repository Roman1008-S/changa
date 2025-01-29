import React, { useEffect, useState } from "react";
import axios from "axios";
import Geocode from "react-geocode";
import { StandaloneSearchBox, LoadScript } from "@react-google-maps/api";
import { Box, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { actionConstants } from "../../constant/actionConstant";

// Constants
const GOOGLE_MAP_API_KEY = "AIzaSyDCKSHeDcuQygMsTWoKx0392TEu295QO08";
const GOOGLE_LIBRARIES = ["places"];

// Configure Geocode API
Geocode.setApiKey(GOOGLE_MAP_API_KEY);
Geocode.setLocationType("ROOFTOP");

const Profile = () => {
    // Redux State
    const { role, userInfo } = useSelector((state) => state.auth);

    // Local State
    const [searchBox, setSearchBox] = useState(null);
    const [address, setAddress] = useState("");
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profileData, setProfileData] = useState({
        email: "",
        psilocybin: "",
        f_name: "",
        l_name: "",
        f_url: "",
        t_url: "",
        l_url: "",
        i_url: "",
        service_description: "",
    });

    const [alertData, setAlertData] = useState({
        status: "",
        content: "",
    });

    // Update `profileData` and coordinates from `userInfo`
    useEffect(() => {
        if (userInfo) {
            setProfileData({
                email: userInfo.email || "",
                f_name: userInfo.f_name || "",
                l_name: userInfo.l_name || "",
                psilocybin: role === "facilitator" ? userInfo.psilocybin || "" : "",
                f_url: role === "facilitator" ? userInfo.f_url || "" : "",
                t_url: role === "facilitator" ? userInfo.t_url || "" : "",
                l_url: role === "facilitator" ? userInfo.l_url || "" : "",
                i_url: role === "facilitator" ? userInfo.i_url || "" : "",
                service_description: role === "facilitator" ? userInfo.service_description || "" : "",
            });
            setLat(userInfo.lat || null);
            setLng(userInfo.lng || null);
        }
    }, [userInfo, role]);

    // Fetch formatted address based on latitude and longitude
    useEffect(() => {
        if (lat && lng) {
            Geocode.fromLatLng(lat.toString(), lng.toString())
                .then((response) => {
                    const formattedAddress = response.results[0]?.formatted_address || "";
                    setAddress(formattedAddress);
                })
                .catch((error) => {
                    console.error("Error fetching address from coordinates:", error);
                });
        }
    }, [lat, lng]);

    // Handle input field changes
    const handleInputChange = ({ target: { name, value } }) => {
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const requestData = {
            updateData: profileData,
            address: { lat, lng },
            userId: userInfo?._id,
            role,
        };

        try {
            const response = await axios.post(
                `${actionConstants.baseURL}${actionConstants.userEndpoints.profileUpdate}`,
                requestData
            );

            const { status, message } = response.data;

            setAlertData({
                status: status || "warning",
                content: message || "Unexpected response from server.",
            });

        } catch (error) {
            setAlertData({
                status: "error",
                content: "Something went wrong! Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle SearchBox reference load
    const handleSearchBoxLoad = (ref) => {
        setSearchBox(ref);
    };

    // Handle address input changes
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    // Handle address selection from the search box
    const handlePlacesChanged = () => {
        const places = searchBox?.getPlaces();

        if (places && places.length > 0) {
            const selectedPlace = places[0];
            setAddress(selectedPlace.formatted_address || "");

            if (selectedPlace.geometry?.location) {
                setLat(selectedPlace.geometry.location.lat());
                setLng(selectedPlace.geometry.location.lng());
            }
        }
    };

    return (
        <section>
            <div className="px-4 mx-auto max-w-screen-md">
                <h2 className="heading text-center pb-5">{userInfo?.name || "Profile"}</h2>

                {alertData.status && (
                    <Alert severity={alertData.status} className="mb-4">
                        {alertData.content}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Email */}
                    <InputField
                        label="Your Email"
                        type="email"
                        id="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        placeholder="example@gmail.com"
                        required
                    />

                    {/* Psilocybin (only for "facilitator" role) */}
                    {role === "facilitator" && (
                        <InputField
                            label="Name of Psilocybin"
                            id="psilocybin"
                            value={profileData.psilocybin}
                            onChange={handleInputChange}
                            placeholder="Input name of your psilocybin"
                        />
                    )}

                    {/* First Name and Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-[30px]">
                        <InputField
                            label="First Name"
                            id="f_name"
                            value={profileData.f_name}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            required
                        />
                        <InputField
                            label="Last Name"
                            id="l_name"
                            value={profileData.l_name}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            required
                        />
                    </div>

                    {/* Social Media URLs (only for "facilitator" role) */}
                    {role === "facilitator" && (
                        <>
                            <SocialMediaInputs
                                profileData={profileData}
                                handleInputChange={handleInputChange}
                            />
                        </>
                    )}

                    {/* Address */}
                    <div>
                        <Box sx={{ width: "100%" }}>
                            <LoadScript googleMapsApiKey={GOOGLE_MAP_API_KEY} libraries={GOOGLE_LIBRARIES}>
                                <StandaloneSearchBox
                                    onLoad={handleSearchBoxLoad}
                                    onPlacesChanged={handlePlacesChanged}
                                >
                                    <InputField
                                        label="Address"
                                        id="address"
                                        value={address}
                                        onChange={handleAddressChange}
                                        placeholder="Input your Address"
                                    />
                                </StandaloneSearchBox>
                            </LoadScript>
                        </Box>
                    </div>

                    {/* Service Description (only for "facilitator" role) */}
                    {role === "facilitator" && (
                        <TextAreaField
                            label="Service Description"
                            id="service_description"
                            rows={5}
                            value={profileData.service_description}
                            onChange={handleInputChange}
                            placeholder="Input your service description (Maximum of 300 words)"
                        />
                    )}

                    {/* Submit Button */}
                    <button
                        className={`btn rounded sm:w-fit ${isSubmitting ? "loading" : ""}`}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

// InputField Component
const InputField = ({ label, id, type = "text", ...props }) => (
    <div>
        <label htmlFor={id} className="form__label">
            {label}
        </label>
        <input
            type={type}
            id={id}
            name={id}
            className="form__input mt-1"
            {...props}
        />
    </div>
);

// TextAreaField Component
const TextAreaField = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="form__label">
            {label}
        </label>
        <textarea
            id={id}
            name={id}
            className="form__input-1 mt-1"
            {...props}
        />
    </div>
);

// SocialMediaInputs Component
const SocialMediaInputs = ({ profileData, handleInputChange }) => (
    <>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-[30px]">
            <InputField
                label="Facebook URL"
                id="f_url"
                value={profileData.f_url}
                onChange={handleInputChange}
                placeholder="Input your Facebook URL"
            />
            <InputField
                label="Twitter URL"
                id="t_url"
                value={profileData.t_url}
                onChange={handleInputChange}
                placeholder="Input your Twitter URL"
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-[30px]">
            <InputField
                label="LinkedIn URL"
                id="l_url"
                value={profileData.l_url}
                onChange={handleInputChange}
                placeholder="Input your LinkedIn URL"
            />
            <InputField
                label="Instagram URL"
                id="i_url"
                value={profileData.i_url}
                onChange={handleInputChange}
                placeholder="Input your Instagram URL"
            />
        </div>
    </>
);

export default Profile;