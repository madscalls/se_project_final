import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Cards from "../Cards/Cards";
import ColorDots from "../ColorDots/ColorDots";
import Footer from "../footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import PreviewModal from "../PreviewModal/PreviewModal";
import AddModal from "../AddModal/AddModal";
import Profile from "../Profile/Profile";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import { AuthContext } from "../../contexts/AuthContext.jsx";

export default function App() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin"); // "signin" | "signup"

  const [selectedPost, setSelectedPost] = useState(null);
  const openPreview = (post) => setSelectedPost(post);
  const closePreview = () => setSelectedPost(null);

  const [posts, setPosts] = useState([]);

  const handleAddPost = (newPost) => {
    setPosts((prev) => [{ id: Date.now(), ...newPost }, ...prev]);
  };

  const [activeColor, setActiveColor] = useState("all");
  const visiblePosts =
    activeColor === "all"
      ? posts
      : posts.filter((p) => p.color === activeColor);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const { user, isLoggedIn, isChecking, login, signup, logout } =
    useContext(AuthContext);

  const currentUser = {
    username: user?.name || user?.email || "Username",
    avatarUrl: user?.avatarUrl || "",
  };

  useEffect(() => {
    if (!isChecking && !isLoggedIn) {
      setIsLoginOpen(true);
      setAuthMode("signin");
    }
  }, [isChecking, isLoggedIn]);

  const handleSaveProfile = (updates) => {
    // This is still local-only for now (fine for basics)
    // Later you’ll PATCH /users/me on backend.
    console.log("Profile updates (local only for now):", updates);
  };

  const canUseApp = !isChecking && isLoggedIn;

  return (
    <div className={`app app--${activeColor}`}>
      <Header
        onAddClick={() =>
          canUseApp ? setIsAddOpen(true) : setIsLoginOpen(true)
        }
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
        onLogout={logout}
        onLogin={() => {
          setAuthMode("signin");
          setIsLoginOpen(true);
        }}
      />

      {!isChecking && (
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <>
                  <ColorDots
                    activeColor={activeColor}
                    onChange={setActiveColor}
                  />
                  <Cards posts={visiblePosts} onCardClick={openPreview} />
                </>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <Profile
                  onEditProfile={() => setIsEditProfileOpen(true)}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route path="/auth" element={<div />} />
        </Routes>
      )}

      <LoginModal
        isOpen={isLoginOpen}
        mode={authMode}
        onClose={() => {
          if (!isLoggedIn) return;
          setIsLoginOpen(false);
        }}
        onSwitchMode={(nextMode) => setAuthMode(nextMode)}
        onSubmit={async ({ mode, username, email, password }) => {
          if (mode === "signup") {
            await signup({ username, email, password });

            setAuthMode("signin");

            // (uncomment) auto-login after signup:
            // await login({ email, password });
            // setIsLoginOpen(false);

            return;
          }

          // Sign in
          await login({ email, password });
          setIsLoginOpen(false);
        }}
      />

      {isAddOpen && (
        <AddModal
          onClose={() => setIsAddOpen(false)}
          onAddPost={handleAddPost}
        />
      )}

      <PreviewModal
        isOpen={!!selectedPost}
        onClose={closePreview}
        post={selectedPost}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        currentUser={currentUser}
        onSave={handleSaveProfile}
      />

      <Footer />
    </div>
  );
}
