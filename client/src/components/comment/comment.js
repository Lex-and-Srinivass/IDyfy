import React from "react";
import "../comment/comment.css";

const Comment = ({ comments }) => {
  return (
    <div className="comment-thread" style={{ borderRadius: "20px" }}>
      <div>{}</div>
      <button
        className="btn-sm pl-3 pr-3 mt-3 mb-6"
        style={{ backgroundColor: "#840FCC", color: "white" }}
      >
        Comments
      </button>

      {comments.map((com, i) => (
        <details key={i} open className="comment" id="comment-1">
          <a href="#comment-1" className="comment-border-link">
            <span className="sr-only">Jump to comment-1</span>
          </a>
          <summary>
            <div className="comment-heading">
              <div className="comment-voting">
                <button type="button">
                  <span aria-hidden="true">&#9650;</span>
                  <span className="sr-only">Vote up</span>
                </button>
                <button type="button">
                  <span aria-hidden="true">&#9660;</span>
                  <span className="sr-only">Vote down</span>
                </button>
              </div>
              <div className="comment-info">
                <h1 className="comment-author">{com.username}</h1>
                <p className="m-0">{com.createdAt}</p>
              </div>
            </div>
          </summary>

          <div className="comment-body">
            <p>{com.content}</p>
          </div>
        </details>
      ))}
    </div>
  );
};

export default Comment;
