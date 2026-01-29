import React from "react";
import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext(null);

const API_BASE =
  import.meta.env.MODE === "production"
    ? "https://ic.oops.wtf"
    : "http://localhost:3000";

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("ic_token"));
  const [user, setUser] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  async function fetchMe(activeToken) {
    const res = await fetch(`${API_BASE}/api/users/me`, {
      headers: { Authorization: `Bearer ${activeToken}` },
    });
    const data = await safeJson(res);
    if (!res.ok) throw new Error(data.message || "Unauthorized");
    return data;
  }

  useEffect(() => {
    let cancelled = false;

    async function restore() {
      if (!token) {
        if (!cancelled) {
          setUser(null);
          setIsChecking(false);
        }
        return;
      }

      try {
        const me = await fetchMe(token);
        if (!cancelled) setUser(me);
      } catch {
        localStorage.removeItem("ic_token");
        if (!cancelled) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) setIsChecking(false);
      }
    }

    setIsChecking(true);
    restore();

    return () => {
      cancelled = true;
    };
  }, [token]);

  async function login({ email, password }) {
    setIsChecking(true);
    try {
      const res = await fetch(`${API_BASE}/api/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.message || "Signin failed");

      localStorage.setItem("ic_token", data.token);
      setToken(data.token);

      const me = await fetchMe(data.token);
      setUser(me);

      await new Promise((resolve) => setTimeout(resolve, 600));

      return me;
    } finally {
      setIsChecking(false);
    }
  }

  async function signup({ username, email, password }) {
    setIsChecking(true);
    try {
      const res = await fetch(`${API_BASE}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
      });

      const data = await safeJson(res);
      if (!res.ok) throw new Error(data.message || "Signup failed");
      return data;
    } finally {
      setIsChecking(false);
    }
  }

  async function updateProfile({ username, avatarUrl }) {
    if (!token) throw new Error("Not authenticated");

    const payload = {};
    if (typeof username === "string" && username.trim())
      payload.name = username.trim();
    if (typeof avatarUrl === "string") payload.avatarUrl = avatarUrl.trim();

    const res = await fetch(`${API_BASE}/api/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await safeJson(res);
    if (!res.ok) throw new Error(data.message || "Update failed");

    setUser(data);
    return data;
  }

  function logout() {
    localStorage.removeItem("ic_token");
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isChecking,
      isLoggedIn: !!user,
      login,
      signup,
      updateProfile,
      logout,
    }),
    [token, user, isChecking],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
