
// this page is only for refernce delete once done//


import React, { useState, useRef } from "react";
import Modal from "react-modal";
import "../Auth/auth.css";
import Idyfy_logo from "../../assets/svg/Idyfy_logo.svg";
import Stones from "../../assets/svg/stones1.svg";
import new_idea from "../../assets/icons/new_idea.svg";
import { isMobile } from "react-device-detect";
import "../NewIdeas/newidea.css";
import InputTag from "./tags";

const New_idea = () => {
  const initialState = {
    title: "",
    description: "",
  };

  //const [tags, setTags] = useState(['tags','input'])
  const [formdata, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    //api put
    try {
      console.log(formdata);
      //console.log(tags);
    } catch (e) {
      console.log(e);
    }
    //closeModal();
    setFormData(initialState);
  };
  
  const close = ()=>{
    closeModal();
    setFormData(initialState);
  }

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };
  
  //   let subtitle;
  let customStyles;
  if (isMobile) {
    customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "90%",
        transform: "translate(-50%, -50%)",
        padding: "0px",
        overflow: "hidden",
      },
    };
  } else {
    customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: "50%",
        transform: "translate(-50%, -50%)",
        padding: "0px",
        overflow: "hidden",
      },
    };
  }

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  //   function afterOpenModal() {
  //     // references are now sync'd and can be accessed.
  //     subtitle.style.color = "#f00";
  //   }
  function closeModal() {
    setIsOpen(false);
  }
  //modal ends

  

  return (
    <div>
      <div className="flex-auto flex flex-col ml-3 mr-3">
        <div className="links home" onClick={openModal}>
          <div className="flex justify-center pt-2">
            <img src={new_idea} alt="New Idea" />
          </div>
          <div>
            <h6>New Ideas</h6>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="relative m-auto container" style={{backgroundColor: "#b6aaf3"}}>
          <div className="row">
            <img
              src={Idyfy_logo}
              style={{ height: "150px" }}
              alt="IDYFY"
              className="mt-2"
            />
            <form>
            <div>
              <div className="flex justify-center">
                <h1 className="mt-2 ">Create a new Idea !!</h1>
              </div>
              <div className="flex justify-center mt-3 mx-3">
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  className="form-control form_box"
                  placeholder="Title"
                  required
                />
              </div>
              <div className="flex justify-center mt-3 mx-3">
                <textarea
                  rows="5"
                  cols="60"
                  name="description"
                  onChange={handleChange}
                  className="form-control form_box"
                  placeholder="Description"
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-center mt-3 mx-3">
                <InputTag />
              </div>
              
              <div className="ml-3 mt-2 mb-3 custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="tandc"
                />
                <label
                  className="custom-control-label text-white"
                  htmlFor="tandc"
                >
                  I agree to the{" "}
                  <a href="/" className="link">
                    T&C
                  </a>
                </label>
              </div>
              <div className="flex justify-center">
                <p className="mr-2 h-10 mb-10 btn button" onClick={handleSubmit}>Create</p>
                <button
                  className="ml-2 h-10 w-30 mb-40 btn button2"
                  onClick={close}
                >
                  Cancel
                </button>
              </div>
            </div>
            </form>
          </div>
          <div className="row absolute bottom-0 left-0 right-0">
            <img src={Stones} alt="Stone Art" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default New_idea;
