import React, { useContext, useEffect, useMemo, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Cards from "../Cards/Cards";
import ColorDots from "../ColorDots/ColorDots";
import Footer from "../footer/Footer";
import PreviewModal from "../PreviewModal/PreviewModal";
import AddModal from "../AddModal/AddModal";
import Profile from "../Profile/Profile";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import LoginPage from "../LoginPage/LoginPage";
import Preloader from "../Preloader/Preloader";

import { getPosts } from "../../utils/api";
import { AuthContext } from "../../contexts/AuthContext.jsx";

/* ---------------- Protected Route ---------------- */

function ProtectedRoute({ isAllowed, redirectTo = "/login", children }) {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children;
}

/* ---------------- App ---------------- */

export default function App() {
  const navigate = useNavigate();

  const { user, isLoggedIn, isChecking, logout, updateProfile } =
    useContext(AuthContext);

  /* ---------- derived user object for UI ---------- */
  const currentUser = useMemo(
    () =>
      user
        ? {
            username: user.name || user.email,
            avatarUrl: user.avatarUrl || "",
          }
        : null,
    [user],
  );

  /* ---------- UI state ---------- */
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [posts, setPosts] = useState([]);
  const [activeColor, setActiveColor] = useState("all");

  /* ---------- derived posts ---------- */
  const visiblePosts =
    activeColor === "all"
      ? posts
      : posts.filter((p) => p.color === activeColor);

  /* ---------- posts ---------- */
  useEffect(() => {
    if (!isLoggedIn) return;

    getPosts()
      .then(setPosts)
      .catch((e) => console.error("getPosts failed:", e));
  }, [isLoggedIn]);

  const handleAddPost = (newPost) => {
    setPosts((prev) => [{ id: Date.now(), ...newPost }, ...prev]);
  };

  /* ---------- loading ---------- */
  if (isChecking) {
    return <Preloader />;
  }

  /* ---------- render ---------- */
  return (
    <div className={`app app--${activeColor}`}>
      {isLoggedIn && (
        <Header
          currentUser={currentUser}
          onAddClick={() => setIsAddOpen(true)}
          onLogout={() => {
            logout();
            navigate("/login", { replace: true });
          }}
        />
      )}

      <Routes>
        {/* ---------- LOGIN ---------- */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
        />

        {/* ---------- HOME ---------- */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAllowed={isLoggedIn}>
              <>
                <ColorDots
                  activeColor={activeColor}
                  onChange={setActiveColor}
                />
                <Cards
                  posts={visiblePosts}
                  onCardClick={setSelectedPost}
                  activeColor={activeColor}
                />
              </>
            </ProtectedRoute>
          }
        />

        {/* ---------- PROFILE ---------- */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAllowed={isLoggedIn}>
              <Profile
                currentUser={currentUser}
                onEditProfile={() => setIsEditProfileOpen(true)}
              />
            </ProtectedRoute>
          }
        />

        {/* ---------- FALLBACK ---------- */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
        />
      </Routes>

      {/* ---------- MODALS ---------- */}
      {isAddOpen && (
        <AddModal
          onClose={() => setIsAddOpen(false)}
          onAddPost={handleAddPost}
        />
      )}

      <PreviewModal
        isOpen={!!selectedPost}
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        currentUser={currentUser}
        onSave={updateProfile}
      />

      {isLoggedIn && <Footer />}
    </div>
  );
}
