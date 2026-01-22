import React, { useContext, useMemo, useState } from "react";
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

import { AuthContext } from "../../contexts/AuthContext.jsx";

function ProtectedRoute({ isAllowed, redirectTo = "/login", children }) {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children;
}

export default function App() {
  const navigate = useNavigate();

  const { user, isLoggedIn, isChecking, logout } = useContext(AuthContext);

  const currentUser = useMemo(
    () => ({
      username: user?.name || user?.email || "Username",
      avatarUrl: user?.avatarUrl || "",
    }),
    [user],
  );

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [posts, setPosts] = useState([]);
  const [activeColor, setActiveColor] = useState("all");

  const visiblePosts =
    activeColor === "all"
      ? posts
      : posts.filter((p) => p.color === activeColor);

  const handleAddPost = (newPost) => {
    setPosts((prev) => [{ id: Date.now(), ...newPost }, ...prev]);
  };

  if (isChecking) {
    return <Preloader />;
  }

  return (
    <div className={`app app--${activeColor}`}>
      {isLoggedIn && (
        <Header
          onAddClick={() => setIsAddOpen(true)}
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          onLogout={() => {
            logout?.();
            navigate("/login", { replace: true });
          }}
        />
      )}

      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <LoginPage />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute isAllowed={isLoggedIn}>
              <>
                <ColorDots
                  activeColor={activeColor}
                  onChange={setActiveColor}
                />
                <Cards posts={visiblePosts} onCardClick={setSelectedPost} />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute isAllowed={isLoggedIn}>
              <Profile
                onEditProfile={() => setIsEditProfileOpen(true)}
                currentUser={currentUser}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
        />
      </Routes>

      {isAddOpen && (
        <AddModal
          onClose={() => setIsAddOpen(false)}
          onAddPost={handleAddPost}
        />
      )}

      <PreviewModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        currentUser={currentUser}
        onSave={(updates) => {
          console.log("Profile updates (local only for now):", updates);
        }}
      />

      {isLoggedIn && <Footer />}
    </div>
  );
}
