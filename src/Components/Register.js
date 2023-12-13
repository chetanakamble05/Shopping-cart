import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from 'react-bootstrap';
import toast from 'react-hot-toast'
import '../App.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isValid, setValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if (formData.firstName.trim() === "") {
      isValid = false;
      validationErrors.firstName =  toast.error("Name is required");
    }
    
    if (formData.email.trim() === "") {
      isValid = false;
      validationErrors.email =  toast.error("Email is required");
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      isValid = false;
      validationErrors.email = toast.error("Invalid email address");
    }


    if (formData.password.trim() === "") {
      isValid = false;
      validationErrors.password =  toast.error("Password is required");
    } else if (formData.password.length < 8) {
      isValid = false;
      validationErrors.password =  toast.error("Password length should be at least 8 characters");
    }

    if (formData.confirmPassword !== formData.password) {
      isValid = false;
      validationErrors.confirmPassword =  toast.error("Passwords do not match");
    }

    setErrors(validationErrors);
    setValid(isValid);

    if (Object.keys(validationErrors).length === 0) {
      toast.success("Registration successful");
      navigate("/");
      axios.post("http://localhost:3000/users", formData)
        .then(console.log(formData))
        .catch((err) => console.log(err, "Error while posting"));
    }
  };

  return (
    <div>
      <div className="company-name">
        <h1 id="Precious">Precious Purse</h1>
      </div>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Card className="form-container" style={{ width: "400px", marginTop:"20px"}} >
          <Card.Body>
            <Card.Title>
              Register
            </Card.Title>
            <div className="form1">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName">
                  <Form.Label className="d-flex ">Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="formEmail">
                  <Form.Label className="d-flex">Email:</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="formPassword">
                  <Form.Label className=" d-flex">Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </Form.Group>
                <br/>

                <Form.Group controlId="formConfirmPassword">
                  <Form.Label className="d-flex">Confirm Password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                </Form.Group>
                <br/>

                <Button variant="secondary" type="submit" style={{ width: "100%" }}>Submit</Button>
              </Form>
              <p className="p-2">
                Click here for{" "}
                <span
                  className="LoginNav"
                  onClick={() => {
                    navigate("/");
                  }}
                  style={{ color: "blue" }}
                >
                  <u>Login</u>
                </span>
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Register;
