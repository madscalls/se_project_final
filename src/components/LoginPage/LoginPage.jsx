import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import ColorDots from "../ColorDots/ColorDots";
import { AuthContext } from "../../contexts/AuthContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, signup } = useContext(AuthContext);

  const [mode, setMode] = useState("signin"); // "signin" | "signup"
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

  // bottom dots tint state
  const [activeColor, setActiveColor] = useState("all");

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
      if (isSignup) {
        await signup({
          username: values.username.trim(),
          email: values.email.trim(),
          password: values.password,
        });

        setMode("signin");
        setValues(initial);
        return;
      }

      await login({
        email: values.email.trim(),
        password: values.password,
      });

      setValues(initial);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = () => {
    setError("");
    setValues(initial);
    setMode((prev) => (prev === "signup" ? "signin" : "signup"));
  };

  return (
    <div className={`loginPage loginPage--${activeColor}`}>
      <div className="loginPage__inner">
        <header className="loginPage__header">
          <h1 className="loginPage__brand">ic.</h1>
          <p className="loginPage__tagline">See color, without noise.</p>
        </header>

        <section className="loginCard" aria-label="Login">
          <h2 className="loginCard__title">
            {isSignup ? "Create account" : "Welcome back"}
          </h2>

          <form className="loginForm" onSubmit={handleSubmit}>
            <div className="loginForm__fields">
              {isSignup && (
                <input
                  type="text"
                  className="loginForm__input"
                  placeholder="Username"
                  value={values.username}
                  onChange={setField("username")}
                  autoComplete="username"
                  required
                  disabled={isSubmitting}
                />
              )}

              <input
                type="email"
                className="loginForm__input"
                placeholder="Email"
                value={values.email}
                onChange={setField("email")}
                autoComplete="email"
                required
                disabled={isSubmitting}
              />

              <input
                type="password"
                className="loginForm__input"
                placeholder="Password"
                value={values.password}
                onChange={setField("password")}
                autoComplete={isSignup ? "new-password" : "current-password"}
                required
                disabled={isSubmitting}
              />

              {isSignup && (
                <input
                  type="password"
                  className="loginForm__input"
                  placeholder="Password again"
                  value={values.passwordAgain}
                  onChange={setField("passwordAgain")}
                  autoComplete="new-password"
                  required
                  disabled={isSubmitting}
                />
              )}
            </div>

            {error && (
              <p className="loginForm__error" role="alert">
                {error}
              </p>
            )}

            <div className="loginForm__actions">
              <button
                className="loginForm__primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : isSignup ? "Sign up" : "Sign in"}
              </button>

              <div className="loginForm__or">or</div>

              <button
                className="loginForm__link"
                type="button"
                onClick={switchMode}
                disabled={isSubmitting}
              >
                {isSignup ? "Sign in" : "Sign up"}
              </button>
            </div>
          </form>

          {/* Dots live INSIDE the card (like your screenshot) */}
          <div className="loginCard__dots">
            <ColorDots activeColor={activeColor} onChange={setActiveColor} />
          </div>
        </section>
      </div>
    </div>
  );
}
