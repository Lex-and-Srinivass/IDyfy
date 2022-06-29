import React from "react";
import { useState, useRef, useEffect } from "react";
import Idyfy_logo from "../../assets/svg/Idyfy_logo.svg";
import "../Auth/auth.css";
import "../NewIdeas/tags.css";
import Footer from "../Footer/footer";
import axios from "axios";
import authHeader from "../../services/auth-header";
import { useLocation } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const EditIdea = () => {
  const loc = useLocation();
  //console.log(loc.state.idea);

  const [title, setTitle] = useState(loc.state.idea.title);
  const [id, setId] = useState(loc.state.idea._id);
  const [description, setDescription] = useState(loc.state.idea.description);

  var win_width = window.innerWidth;
  var style_width;
  if (win_width < 500) {
    style_width = "90%";
  } else {
    style_width = "60%";
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [file, setFile] = useState();

  const saveFile = (e) => {
    setFile(e.target.files[0]);
  };

  // code for tags
  const [tags, setTags] = useState([...loc.state.idea.tags]);

  const tagInput = useRef();

  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags([...newTags]);
  };

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val]);
      tagInput.current.value = null;
    }
    //  else if (e.key === 'Backspace' && !val) {
    //   removeTag(tags.length - 1);
    // }
  };
  // code for tags
  const links = [
    {
      link_name: "figma",
      link_url: "https://www.figma.com/file/ngRkPApYAocRZtiGtsnK8y/Idyfy",
    },
    {
      link_name: "github",
      link_url: "https://www.figma.com/file/ngRkPApYAocRZtiGtsnK8y/Idyfy",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("links", links);
    try {
      let res = await axios({
        method: "PUT",
        url: "/api/idea/update-idea",
        headers: authHeader(),
        data: formData,
      });

      if (res.status === 200) {
        setTitle("");
        setDescription("");
        setTags([]);
        console.log("idea updated sucessfully");
      } else {
        console.log("some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="mb-3 mt-3" style={{ color: "white", fontSize: "1.6rem" }}>
        ! Edit Your Idea To Make It More Brilliant !
      </h1>
      {console.log(win_width)}
      <div
        className=" m-auto container formsize"
        style={{
          backgroundColor: "#b6aaf3",
          width: style_width,
          borderRadius: "20px",
        }}
      >
        <div className="row">
          <img
            src={Idyfy_logo}
            style={{ height: "150px" }}
            alt="IDYFY"
            className="mt-2"
          />
          <form
            onSubmit={handleSubmit}
            onKeyPress={(event) => {
              if (event.which === 13 /* Enter */) {
                event.preventDefault();
              }
            }}
          >
            <div className="flex justify-center">
              <h1
                className="mt-3"
                style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              >
                Edit Idea
              </h1>
            </div>
            <div className="flex justify-center mt-3 mx-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control form_box"
                placeholder="Title"
              />
            </div>
            <div className="flex justify-center mt-3 mx-3">
              <Editor
                textareaName="Body"
                // initialValue="<p>hello ser</p>"
                // initialValue={value}
                apiKey="krw1cp6qqs9hj1oedlcjumsizty01tq1ksvpxkn9d94pr3qj"
                value={description}
                init={{
                  height: 300,
                  width: "100%",
                  menubar: true,
                  // setContent: "<strong>Some contents</strong>",
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  placeholder: "Description",
                }}
                onEditorChange={(newText) => setDescription(newText)}
              />
            </div>

            <div className="flex justify-start mt-3 mx-3">
              <div className="input-tag">
                <ul className="input-tag__tags">
                  {tags.map((tag, i) => (
                    <li key={i}>
                      {tag}
                      <button type="button" onClick={() => removeTag(i)}>
                        +
                      </button>
                    </li>
                  ))}
                  <li className="input-tag__tags__input">
                    <input
                      type="text"
                      placeholder="Add Tags"
                      ref={tagInput}
                      onKeyDown={inputKeyDown}
                    />
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-start mt-3 mx-3">
              <input
                class="form-control form_box"
                type="file"
                multiple
                onChange={saveFile}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-10 mr-2 h-10 mb-10 btn button"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditIdea;
