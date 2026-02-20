import React, { useEffect, useState } from "react";
import { MdDeleteSweep, MdOpenInNew } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "../Component/Navbar";
import "./Favorites.css";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Load favorites + fetch posts
  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(savedFavorites);

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/posts");
      const data = await response.json();

      if (Array.isArray(data)) {
        setPosts(data);
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  // Remove one favorite
  const removeFavorite = (postId) => {
    const updatedFavorites = favorites.filter(
      (id) => id !== postId
    );

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
    setFavorites(updatedFavorites);

    toast.info("Removed from favorites");
  };

  // Clear all
  const clearAllFavorites = () => {
    if (window.confirm("Clear all saved posts?")) {
      localStorage.setItem("favorites", "[]");
      setFavorites([]);
      toast.info("All favorites cleared");
    }
  };

  // Filter only favorite posts
  const favoritePosts = posts.filter((post) =>
    favorites.includes(post.id)
  );

  return (
    <div className="favorites-page-container">
      <Navbar />

      <main className="favorites-main">
        <div className="favorites-header">
          <h2>
            Curated Collection
            <span className="count-badge">
              {favoritePosts.length}
            </span>
          </h2>

          {favoritePosts.length > 0 && (
            <button
              className="clear-all-btn"
              onClick={clearAllFavorites}
            >
              <MdDeleteSweep size={20} />
              Clear List
            </button>
          )}
        </div>

        {favoritePosts.length === 0 ? (
          <div className="fav-empty-state">
            <FaRegStar className="empty-icon" />
            <h3>Your list is empty</h3>
            <p>
              Discover interesting posts and save them
              to read later
            </p>
            <button className="browser-btn" onClick={()=>navigate("/dashboard")}>Explore stories</button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favoritePosts.map((post) => (
              <div className="fav-card" key={post.id}>
                <div className="fav-card-image">
                  <img
                    src={post.imageurl}
                    alt="Post"
                  />
                </div>

                <div className="fav-card-body">
                  <h3 className="fav-title">
                    {post.title}
                  </h3>

                  <p className="fav-excerpt">
                    {post.description?.slice(0, 100)}...
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      className="read-btn"
                    >
                      <MdOpenInNew />
                      Read
                    </button>

                    <button
                      className="remove-fav-btn"
                      onClick={() =>
                        removeFavorite(post.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}