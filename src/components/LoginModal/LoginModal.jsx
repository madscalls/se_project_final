import React, { useMemo, useState } from "react";
import Modal from "../Modal/Modal";
import LoginDotsBackdrop from "../LoginDotsBackdrop/LoginDotsBackdrop";
import "./LoginModal.css";

export default function LoginModal({
  isOpen,
  mode = "signin",
  onClose,
  onSubmit,
  onSwitchMode,
}) {
  const isSignup = mode === "signup";

  const initial = useMemo(
    () => ({
      username: "",
      email: "",
      password: "",
      passwordAgain: "",
    }),
    [],
  );

  const [values, setValues] = useState(initial);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = (name) => (e) => {
    if (error) setError("");
    setValues((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const validate = () => {
    if (isSignup && !values.username.trim()) return "Username is required.";
    if (!values.email.trim()) return "Email is required.";
    if (!values.password) return "Password is required.";

    if (isSignup) {
      if (!values.passwordAgain) return "Please confirm your password.";
      if (values.password !== values.passwordAgain)
        return "Passwords do not match.";
      if (values.password.length < 6)
        return "Password must be at least 6 characters.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit?.({
        mode,
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      setValues(initial);
      onClose?.();
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    const nextMode = isSignup ? "signin" : "signup";
    setError("");
    setValues(initial);
    onSwitchMode?.(nextMode);
  };

  return (
    <Modal
      isOpen={isOpen}
      title={isSignup ? "Create account" : "Sign in"}
      onClose={onClose}
    >
      <LoginDotsBackdrop tint="purple" />

      <form className="login" onSubmit={handleSubmit}>
        <ul className="login__list">
          {isSignup && (
            <li className="login__input_wrapper">
              <label className="login__label">
                <span className="login__labelText">Username</span>
                <input
                  type="text"
                  className="login__input"
                  placeholder="Username"
                  value={values.username}
                  onChange={setField("username")}
                  autoComplete="username"
                  required
                  disabled={isSubmitting}
                />
              </label>
            </li>
          )}

          <li className="login__input_wrapper">
            <label className="login__label">
              <span className="login__labelText">Email</span>
              <input
                type="email"
                className="login__input"
                placeholder="Email"
                value={values.email}
                onChange={setField("email")}
                autoComplete="email"
                required
                disabled={isSubmitting}
              />
            </label>
          </li>

          <li className="login__input_wrapper">
            <label className="login__label">
              <span className="login__labelText">Password</span>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                value={values.password}
                onChange={setField("password")}
                autoComplete={isSignup ? "new-password" : "current-password"}
                required
                disabled={isSubmitting}
              />
            </label>
          </li>

          {isSignup && (
            <li className="login__input_wrapper">
              <label className="login__label">
                <span className="login__labelText">Password again</span>
                <input
                  type="password"
                  className="login__input"
                  placeholder="Password again"
                  value={values.passwordAgain}
                  onChange={setField("passwordAgain")}
                  autoComplete="new-password"
                  required
                  disabled={isSubmitting}
                />
              </label>
            </li>
          )}
        </ul>

        {error && (
          <p className="login__error" role="alert">
            {error}
          </p>
        )}

        <button className="login__submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Working..." : isSignup ? "Sign up" : "Sign in"}
        </button>

        <div className="login__divider" aria-hidden="true">
          <span className="login__dividerText">or</span>
        </div>

        <button
          className="login__reroute"
          type="button"
          onClick={switchMode}
          disabled={isSubmitting}
        >
          {isSignup ? "Already have an account? Sign in" : "New here? Sign up"}
        </button>
      </form>
    </Modal>
  );
}
