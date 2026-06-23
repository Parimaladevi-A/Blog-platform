import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");

  const getPost = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/${id}`
      );
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/comments/${id}`
      );
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost();
    getComments();

    // ESLint disabled for CI build (required for Vercel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const addComment = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:5000/api/comments/${id}`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComment("");
      getComments();
    } catch (err) {
      console.log(err);
    }
  };

  if (!post) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <hr />

      <h2>Comments</h2>

      <form onSubmit={addComment}>
        <input
          type="text"
          placeholder="Write comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit">Add Comment</button>
      </form>

      {comments.map((c) => (
        <div className="comment" key={c._id}>
          <b>{c.user?.name}</b>
          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export default PostDetails;