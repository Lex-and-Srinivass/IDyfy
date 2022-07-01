import React, { useState, useEffect } from "react";
import back from "../../assets/images/backidea.png";
import contri from "../../assets/svg/contributor_icon.svg";
import Chat from "../../assets/icon/chat.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import authHeader from "../../services/auth-header";
import Footer from "../Footer/footer";
import { Link } from "react-router-dom";
import Loader from "../Loader/loader";
import { toast } from "react-toastify";
import Comment from "../../components/comment/comment";

const Idea = () => {
  const notify5 = () => toast.success("Idea Liked!");
  const notify6 = () => toast.success("Idea Unliked!");
  const notify3 = (text) => toast.error(text);

  const [load, setLoad] = useState(true);
  const [idea, setIdea] = useState({});
  const [comments, setComment] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [canEdit, setCanEdit] = useState(false);
  const [isLiked, setActiveliked] = useState();
  var [likes_count, setLikesCount] = useState();
  const [content, setContent] = useState("");
  const [load2, setLoad2] = useState(false);

  const { id } = useParams();
  const url = "/ideaEdit/";
  // const { idea_id } = useParams();
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      let res = await axios({
        method: "POST",
        url: "/api/comment/post-comment",
        headers: authHeader(),
        data: {
          idea_id: id,
          feature_id: null,
          content: content,
        },
      });

      if (res.status === 200) {
        console.log("comment sucessfully");
        setContent("");
        reloadpage();
      } else {
        console.log("some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const reloadpage = () => {
    setLoad2(!load2);
  };

  const fetchIdea = () => {
    axios
      .get(`/api/idea/get-idea?id=${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        setIdea(res.data.idea);
        setComment(res.data.comments);
        setContributors(res.data.contributed_users);
        setCanEdit(res.data.can_edit);
        setActiveliked(res.data.idea.liked);
        setLikesCount(res.data.idea.liked_users.length);
        console.log(res.data);
        setLoad(false);
      })
      .catch((err) => {
        notify3(err.response.data.error);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchIdea();
  }, [load2]);

  useEffect(() => {
    fetchIdea();
  }, []);

  if (load) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const toggleLiked = async () => {
    setActiveliked(!isLiked);
    if (isLiked === false) {
      try {
        // console.log(skip);
        setLikesCount(++likes_count);
        await axios
          .get(`/api/idea/like-idea?idea_id=${idea._id.toString()}`, {
            headers: authHeader(),
          })
          .then(
            (res) => {
              console.log(res);
              notify5();
            },
            (err) => {
              console.log(err);
              notify3(err.response.data.error);
            }
          );
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        // console.log(skip);
        setLikesCount(--likes_count);
        await axios
          .get(`/api/idea/unlike-idea?idea_id=${idea._id.toString()}`, {
            headers: authHeader(),
          })
          .then(
            (res) => {
              console.log(res);
              notify6();
            },
            (err) => {
              console.log(err);
              notify3(err.response.data.error);
            }
          );
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div>
      {console.log(contributors)}
      <div className="relative flex justify-center">
        <div
          className="absolute top-1/3 sm:text-xl md:text-4xl lg:text-6xl"
          style={{ color: "white" }}
        >
          {idea.title}
        </div>
        <img src={back} alt="backdrop" style={{ width: "100%" }} />
      </div>

      <div className="container">
        <div className="row">
          <div className="dropdown col-md-2 offset-md-10 d-none d-sm-block mt-6 mb-3">
            <div className="dropdown">
              <button
                className=""
                style={{ backgroundColor: "transparent" }}
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={contri} alt="contributors" />
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {contributors.map((con, i) => (
                  <li key={i}>
                    {/* when you click on a user route him to his profile page */}
                    <Link
                      to={`/profile?id=${con._id.toString()}`}
                      className="dropdown-item"
                    >
                      {con.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-2">
            <button
              className="btn-sm pl-3 pr-3 mb-3 mt-3"
              style={{ backgroundColor: "#840FCC", color: "white" }}
            >
              Description :
            </button>
          </div>

          <div className="col-md-8 pr-3 pl-3">
            <p
              className="p-4"
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                textAlign: "left",
              }}
            >
              {/* {idea.description} */}
              <div dangerouslySetInnerHTML={{ __html: idea.description }} />
            </p>
          </div>
          <div className="mt-3 offset-md-6 offset-7 col-md-1 flex justify-end col-1">
            {/* <img src={Like} alt="like" className="absolute mt-1 " /> */}
            {isLiked === false ? (
              <img
                src="https://img.icons8.com/ios/50/FFFFFF/hearts--v1.png"
                // src={Like}
                alt="feed icon"
                className="absolute mt-0.3 ml-1"
                width="26px"
                onClick={toggleLiked}
              />
            ) : (
              <img
                src="https://img.icons8.com/fluency-systems-filled/48/FF0000/like.png"
                // src={Like}
                alt="feed icon"
                className="absolute mt-0.3 ml-1"
                width="26px"
                onClick={toggleLiked}
              />
            )}
          </div>
          <div
            className="mt-3 text-start col-md-1 col-1 "
            style={{ color: "white" }}
          >
            {likes_count}
          </div>

          <div className="ml-6 mt-3  col-md-1 d  col-1 flex justify-end">
            <img
              src={Chat}
              alt="chat"
              className="absolute  mt-1"
              width="22px"
            />
          </div>
          <div
            className="mt-3 text-start col-md-1 col-1"
            style={{ color: "white" }}
          >
            {comments.length}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 mt-3">
            <button
              className="btn-sm pl-3 pr-3 mb-3 mt-3"
              style={{ backgroundColor: "#840FCC", color: "white" }}
            >
              Links :
            </button>
          </div>
          <div className="col-md-2 p-3 mt-3 ">
            <a className="m-3" style={{ color: "white" }} href="/">
              Figma
            </a>
            <a className="m-3" style={{ color: "white" }} href="/">
              Github
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 mt-3">
            <button
              className="btn-sm pl-3 pr-3 mb-3 mt-3"
              style={{ backgroundColor: "#840FCC", color: "white" }}
            >
              #Tags# :
            </button>
          </div>
          <div className="col-md-2 p-3 mt-3 ">
            {idea.tags.map((tag, i) => (
              <a key={i} className="m-3" style={{ color: "white" }} href="/">
                #{tag.replace(/ /g, "")}
              </a>
            ))}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <button
              className="btn-sm pl-3 pr-3 mb-3 mt-3"
              style={{ backgroundColor: "#840FCC", color: "white" }}
            >
              Upload Files
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Link
              to={"../graph/" + id}
              className="btn pl-3 pr-3 mb-3 mt-3"
              style={{
                backgroundColor: "#F62F08",
                color: "white",
                fontSize: "1.7rem",
                borderRadius: "1.2rem",
                fontWeight: "500",
              }}
            >
              View Graph
            </Link>
          </div>
        </div>
        {canEdit ? (
          <div className="row justify-content-center">
            <div className="col-md-4">
              <Link
                to={{
                  pathname: url + id,
                  state: { idea },
                }}
              >
                <button
                  className="btn pl-3 pr-3 mb-3 mt-3"
                  style={{
                    backgroundColor: "#F62F08",
                    color: "white",
                    fontSize: "1.7rem",
                    borderRadius: "1.2rem",
                    fontWeight: "500",
                  }}
                >
                  Edit Idea
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="mt-10 row">
          <div className="col-6">
            <Comment comments={comments} />
          </div>

          <div className="col-6">
            <div className="row">
              <div className="flex justify-center mt-3 mx-3">
                <input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="form-control form_box"
                  placeholder="Enter Comment"
                />
              </div>
            </div>
            <div className="mt-6 row">
              <div className="flex justify-center">
                <button
                  type="submit"
                  onClick={handleComment}
                  className="mr-2 h-10 mb-10 btn button"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Idea;
