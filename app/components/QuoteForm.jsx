"use client";

import { useState } from "react";
import styles from "../page.module.css";
import Services from "../data/services";

const SERVICE_TYPES = Services.filter((s) => s.shortTitle).map(
  (s) => s.shortTitle
);

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    serviceType: "",
    message: "",
    company: "", // honeypot
  });

  const [status, setStatus] = useState({ state: "idle", message: "" });
  // states: idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name || form.name.trim().length < 2)
      return "Please enter your name.";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Please enter a valid email.";
    if (!form.serviceType) return "Please select a service type.";
    if (!form.message || form.message.trim().length < 10)
      return "Please provide a few details (10+ characters).";
    if (form.company) return "Spam detected."; // honeypot filled in
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatus({ state: "error", message: error });
      return;
    }
    setStatus({ state: "loading", message: "" });

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          serviceType: form.serviceType,
          message: form.message.trim(),
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to submit. Please try again.");
      }

      setStatus({
        state: "success",
        message: "Thanks! We received your request and will reply shortly.",
      });
      setForm({
        name: "",
        email: "",
        serviceType: "",
        message: "",
        company: "",
      });
    } catch (err) {
      setStatus({
        state: "error",
        message: err.message || "Something went wrong.",
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.heading}>Get a Free Quote</h2>
      <p className={styles.subhead}>
        Tell us a bit about your place and what you need cleaned.
      </p>

      {/* Honeypot field (hidden from humans; bots will often fill it) */}
      <div className={styles.hp}>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          value={form.company}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="name">
          Name<span className={styles.req}>*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Jane Doe"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">
          Email<span className={styles.req}>*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="serviceType">
          Service Type<span className={styles.req}>*</span>
        </label>
        <select
          id="serviceType"
          name="serviceType"
          value={form.serviceType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Choose a service…
          </option>
          {SERVICE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">
          Details<span className={styles.req}>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="Beds/baths, approx. SF, pets, preferred timing, special requests…"
          required
        />
      </div>

      <div className={styles.actions}>
        <button
          style={{ margin: "auto" }}
          className={styles.button}
          type="submit"
          disabled={status.state === "loading"}
        >
          {status.state === "loading" ? "Sending…" : "Request Quote"}
        </button>

        <div
          className={
            status.state === "success"
              ? styles.success
              : status.state === "error"
              ? styles.error
              : styles.status
          }
          aria-live="polite"
          role="status"
        >
          {status.message}
        </div>
      </div>
    </form>
  );
}
