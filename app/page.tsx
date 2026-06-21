"use client";

import { FormEvent, useState } from "react";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || "")
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(result.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage(result.message || "Signup saved successfully.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Could not connect to the server.");
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="intro">
          <p className="eyebrow">Next.js + file storage demo</p>
          <h1>Simple signup form</h1>
          <p>
            Submit your name, email, and password. The backend route stores the signup in
            <code> server-data/users.jsonl</code> on the server.
          </p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Bhupesh" required minLength={2} />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="bhupesh@example.com" required />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Minimum 6 characters" required minLength={6} />

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Saving..." : "Sign up"}
          </button>

          {message ? (
            <p className={`form-message ${status === "success" ? "success" : "error"}`}>{message}</p>
          ) : null}
        </form>
      </section>
    </main>
  );
}
