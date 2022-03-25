import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./lib/treestyle.css";
const Graph_3_iterate_children = (props) => {
  let TreeData = props.tree,
    cardkey = "",
    //   pathNumber = props.pathno,
    //   strokeWidth = "5px",
    //   strokeColor = "#000000",
    _id = props._id;

  // const path = () => {
  //   let newpath = document.createElementNS(
  //     "http://www.w3.org/2000/svg",
  //     "path"
  //   );
  //   let svgContainer = document.getElementById("tree__svg-container__svg");
  //   newpath.id = "path" + pathNumber;
  //   newpath.setAttribute("stroke", strokeColor);
  //   newpath.setAttribute("fill", "none");
  //   newpath.setAttribute("stroke-width", strokeWidth);
  //   svgContainer.appendChild(newpath);
  //   pathNumber++;
  // };
  return (
    // <div className="tree__container__step">
    <>
      <div className="tree__container__branch">
        {TreeData.map((item, key) =>
          item.parent_id === _id ? (
            <div className="tree__container__step" key={"div" + key}>
              <div
                className="tree__container__step__card dropdown"
                id={item._id}
              >
                {/* {(cardkey = "card_" + item.id)} */}
                <p
                  // id={cardkey}
                  className="tree__container__step__card__p"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {item.title}
                </p>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"../feature/" + TreeData[0]._id + "/" + item._id}
                    >
                      {" "}
                      View / Edit
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={"/createFeature/" + TreeData[0]._id + "/" + item._id}
                    >
                      Add Child
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to={
                        "/createFeature/" +
                        TreeData[0]._id +
                        "/" +
                        item.parent_id
                      }
                    >
                      Add Sibling
                    </Link>
                  </li>
                </ul>
                <button
                  className="HideShow relative"
                  onClick={() => props.Clicked(item._id)}
                  style={{
                    color: "white",
                    backgroundColor: "red",
                    height: "25px",
                    width: "25px",
                    right: "-5px",
                    borderRadius: "20px",
                  }}
                >
                  {(!item.show && "+") || (item.show && "-")}
                </button>
              </div>
              {/* {path()} */}
              <Graph_3_iterate_children
                tree={TreeData}
                _id={item._id}
                Clicked={props.Clicked}
              />
            </div>
          ) : (
            <div key={"div" + key}></div>
          )
        )}
      </div>
      {/* // </div> */}
    </>
  );
};

export default Graph_3_iterate_children;
