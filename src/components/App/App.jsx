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

import { getPosts, deletePost } from "../../utils/api";
import { AuthContext } from "../../contexts/AuthContext.jsx";

function ProtectedRoute({ isAllowed, redirectTo = "/login", children }) {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return children;
}

export default function App() {
  const navigate = useNavigate();

  const { user, isLoggedIn, isChecking, logout, updateProfile } =
    useContext(AuthContext);

  const currentUser = useMemo(
    () =>
      user
        ? {
            _id: user._id,
            username: user.name || user.email,
            avatarUrl: user.avatarUrl || "",
          }
        : null,
    [user],
  );

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeColor, setActiveColor] = useState("all");
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().replace(/^#/, "").toLowerCase();

  const visiblePosts = posts
    .filter((p) => (activeColor === "all" ? true : p.color === activeColor))
    .filter((p) => {
      if (!normalizedQuery) return true;
      const tags = Array.isArray(p.hashtags) ? p.hashtags : [];
      return tags.some((t) =>
        String(t).toLowerCase().includes(normalizedQuery),
      );
    });

  useEffect(() => {
    if (!isLoggedIn) return;

    getPosts()
      .then(setPosts)
      .catch((e) => console.error("getPosts failed:", e));
  }, [isLoggedIn]);

  const handleAddPost = (newPost) => {
    setPosts((prev) => [{ ...newPost }, ...prev]);
  };

  const handleDeletePost = async (post) => {
    await deletePost(post._id);
    setPosts((prev) => prev.filter((p) => p._id !== post._id));
    if (selectedPost?._id === post._id) setSelectedPost(null);
  };

  if (isChecking) {
    return <Preloader />;
  }

  return (
    <div className={`app app--${activeColor}`}>
      {isLoggedIn && (
        <Header
          currentUser={currentUser}
          query={query}
          onQueryChange={setQuery}
          onAddClick={() => setIsAddOpen(true)}
          onLogout={() => {
            logout();
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
                <Cards
                  posts={visiblePosts}
                  onCardClick={setSelectedPost}
                  activeColor={activeColor}
                  onDeletePost={handleDeletePost}
                  currentUser={user}
                />
              </>
            </ProtectedRoute>
          }
        />

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
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
        currentUserId={user?._id}
        onDeletePost={handleDeletePost}
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
