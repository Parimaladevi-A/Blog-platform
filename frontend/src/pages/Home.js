import React, { useEffect, useState } from "react";
import api from "../api";
import PostDetails from "./PostDetails";

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const likePost = async (id) => {
    try {
      await api.put(
        `/posts/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      getPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      getPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Blog Platform</h1>

      <input
        placeholder="Search blogs..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {posts
        .filter((post) =>
          post.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((post) => (
          <div className="post-card" key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>

            <h4>Category: {post.category}</h4>

            <p>By {post.author?.name}</p>

            <button className="like" onClick={() => likePost(post._id)}>
              ❤️ {post.likes.length}
            </button>

            <button className="delete" onClick={() => deletePost(post._id)}>
              Delete
            </button>

            <button className="edit">Edit</button>

            <PostDetails postId={post._id} />
          </div>
        ))}
    </div>
  );
}

export default Home;