// src/components/Register.js
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Xử lý đăng ký ở đây
    console.log(data);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input type="text" {...register("email")} />
        <br />
        <label>Password:</label>
        <input type="password" {...register("password")} />
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Register;
