/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useState } from "react";
import pb from "../services/pocketbase.js";
import "./styles.css";

const Login = ({ onLogin }) => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  async function login(data) {
    try {
      await pb.collection("users").authWithPassword(data.email, data.password);
      onLogin();
    } catch (error) {
      setLoading(false);
      setHasFailed(true);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {isLoading && <p>Loading...</p>}
      {hasFailed && <p>Failed to authenticate, try again</p>}
      <form onSubmit={handleSubmit(login)} style={{ display: "block" }}>
        <label style={{ display: "block" }}>
          Email:
          <input
            type="text"
            name="email"
            {...register("email")}
            style={{ display: "block" }}
          />
        </label>
        <br />
        <label style={{ display: "block" }}>
          Password:
          <input
            type="password"
            name="password"
            {...register("password")}
            style={{ display: "block" }}
          />
        </label>{" "}
        <br />
        <input type="submit" disabled={isLoading} value="Submit" />
      </form>
    </div>
  );
};

export default Login;
