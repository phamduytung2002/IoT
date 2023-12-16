// src/components/Login.js
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  console.log("Login");
  const onSubmit = (data) => {
    // Xử lý đăng nhập ở đây
    console.log(data);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email:</label>
        <input type="text" {...register("email")} />
        <br />
        <label>Password:</label>
        <input type="password" {...register("password")} />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

export default Login;
