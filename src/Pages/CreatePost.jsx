import React from "react";
import Navbar from "../Component/Navbar";
import { FaCloudUploadAlt, FaLink, FaRegPaperPlane, FaTimes, FaUser } from "react-icons/fa";

function CreatePost() {
  return (
    <div className="create-post-page">
      <Navbar />
      <div className="create-post-container">
        <header className="form-header">
          <h1>Create New Post</h1>
          <p>Sahare your thoughts and stories with the world</p>
        </header>

        <div className="post-form-card">
          <form>
            <div className="form-group">
              <lable>Post Title</lable>
              <div className="input-wrapper">
                <FaHeading className="input-icon" />
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Enter a catchy title..."
                />
              </div>
            </div>

            <div className="form-group">
              <lable>Auther Name</lable>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="auther"
                  className="form-control"
                  placeholder="your name"
                />
              </div>
            </div>

            <div className="form-group">
              <lable>Description</lable>

              <textarea
                name="description"
                className="form-control"
                placeholder="what's on your mind? write your story here"
              />
            </div>
            <div className="form-group">
              <lable>Cover Image</lable>
              <div className="image-source-tabs">
                <button className="tab-btn active" type="button">
                  Image URL
                </button>

                <button className="tab-btn " type="button">
                  Upload File
                </button>
              </div>
              <div className="input-wrapper">
                <FaLink className="input-icon" />
                <input
                  type="url"
                  name="imageUrl"
                  className="form-control"
                  placeholder="paste image URL here"
                />
              </div>
              <div className="image-upload-area">
                <FaCloudUploadAlt className="upload-icon" />
                <p>Click to upload image from your device</p>
              </div>
              <div className="image-preview-container">
                <img src="" 
                alt="preview"
                className="image=preview"/>

                <button className="remove-image-btn">
                    <FaTimes/>
                </button>
              </div>
            </div>
            <div className="form-action-row">
                <button className="submit-btn" type="submit">
                    <FaRegPaperPlane/>Publish Post
                </button>
                <button className="cancle-btn" type="button">
                    Clear Form
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
