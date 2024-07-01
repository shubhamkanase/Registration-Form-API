import React, { useState } from "react";
import axios from "axios";
import "../components/RegistrationForm.css";
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    description: "",
    image: null,
    termsAccepted: false,
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      description,
      image,
      termsAccepted,
    } = formData;

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);
    formDataToSend.append("phone", phone);
    formDataToSend.append("description", description);
    formDataToSend.append("image", image);
    formDataToSend.append("termsAccepted", termsAccepted);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        navigate('/success');
      } else {
        setError("Registration failed");
      }
    } catch (error) {
      console.log("Registration failed: " + error.message);
    }
  };
  return (
  <>
    <h1 className="App">Registration Form</h1>
    <form className="form-container" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
      <label className="form-label">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>

      <label className="form-label">
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>

      <label className="form-label">
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>

      <label className="form-label">
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="form-input"
        />
      </label>

      <label className="form-label">
        Phone:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          maxLength={10}
          minLength={10}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Upload Image:
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="form-input"
        />
      </label>

      <label className="form-label checkbox">
        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          className="form-checkbox"
        />
        I accept the terms and conditions
      </label>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  </>
  );
};

export default RegistrationForm;
