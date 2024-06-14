import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const [disableSubmitButtom, setDisableSubmitButtom] = useState(true);

  const [isEmptyArray, setIsEmptyArray] = useState([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (user !== null) {
      navigate("/");
    }
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // You can handle form submission logic here
    if (disableSubmitButtom) {
      // Check if the value of the fields is empty and update isEmptyArray accordingly
      const updatedIsEmptyArray = Object.values(formData).map(
        (value) => value === ""
      );
      setIsEmptyArray(updatedIsEmptyArray);
      console.log(updatedIsEmptyArray);
    } else {
      // BACKEND
      // onSubmit(formData);
      console.log("Registering");

      axios
        .post("/api/auth/register", formData)
        .then((response) => {
          console.log(response.data);
          if (Object.keys(response.data).length === 0) {
            toast.error("Email is already used.");
          } else {
            toast.success("Register Successful!");
            console.log("Register Successful!");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          toast.error("Internal Server Error", {
            toastStyle: { background: "red", text: "white" },
          });
        });
      // navigate("/");
    }
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setDisableSubmitButtom(!allFieldsFilled);
  }, [formData]);

  return (
    <div
      className="
    max-w-lg mx-auto p-6 bg-gray-100 rounded-md shadow-md shadow-gray-300"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
          isFieldEmpty={isEmptyArray[0]}
        />
        <TextInput
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          isFieldEmpty={isEmptyArray[1]}
        />
        <TextInput
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          isFieldEmpty={isEmptyArray[2]}
        />
        <TextInput
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          isFieldEmpty={isEmptyArray[3]}
          password
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
