import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [alert, setAlert] = useState("");

  // Handle input change
  const handleInputChange = ({ target: { id, value } }) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation (basic example)
    if (!formData.email || !formData.subject || !formData.message) {
      setAlert("All fields are required!");
    } else {
      setAlert("Your message has been sent successfully!");
      // Reset form
      setFormData({
        email: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          Got a technical issue? Want to send feedback about a beta feature?
          Let us know!
        </p>

        {/* Alert message */}
        {alert && (
          <div className="mb-4 text-center text-red-500">
            <p>{alert}</p>
          </div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Email Field */}
          <InputField
            id="email"
            label="Your Email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleInputChange}
          />

          {/* Subject Field */}
          <InputField
            id="subject"
            label="Subject"
            type="text"
            placeholder="Let us know how we can help you"
            value={formData.subject}
            onChange={handleInputChange}
          />

          {/* Message Field */}
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">
              Your Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Leave a comment . . ."
              className="form__input-1 mt-1"
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn rounded sm:w-fit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

// Reusable Input Field Component
const InputField = ({ id, label, type, placeholder, value, onChange }) => (
  <div>
    <label htmlFor={id} className="form__label">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="form__input mt-1"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default Contact;