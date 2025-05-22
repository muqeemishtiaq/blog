"use client";

import React from "react";
import { signIn, useSession } from "next-auth/react";
import style from "./page.module.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router.push("/dashboard"); // if already logged in, go to dashboard
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className={style.input}
          required
        />
        <input
          type="password"
          placeholder="password"
          className={style.input}
          required
        />
        <button className={style.button}>Login</button>
      </form>

      <button onClick={() => signIn("google")}>Login with Google</button>
    </div>
  );
};

export default Login;
