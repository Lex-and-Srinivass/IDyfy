import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Graph_Iterate_root from "./graph_iterate_root";
import "./lib/treestyle.css";
import axios from "axios";
import authHeader from "../../services/auth-header";

const Graph = (props) => {
  const { idea_id } = useParams();
  const [Edit, SetEdit] = useState(false);
  const [allLinks, SetAllLinks] = useState([]);
  let version = props.version;
  let whosegraph = props.whosegraph;
  const [TreeData, SetTreeData] = useState();
  const getChilderen = async (p) => {
    await axios
      .get(
        `/api/feature/features-by-parent?idea_id=${idea_id}&parent_id=${p}&version=${version}&whosegraph=${whosegraph}`,
        {
          headers: authHeader(),
        }
      )
      .then(
        (res) => {
          SetTreeData([...TreeData, ...res.data.features]);
          localStorage.setItem(
            "idea",
            JSON.stringify([...TreeData, ...res.data.features])
          );
          // console.log([...TreeData, ...res.data.features]);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  const Clicked = (p) => {
    console.log("Clicked on item " + p);
    TreeData.map((item) => {
      if (item._id == p) {
        if (item.show === false) {
          // show kids
          item.show = true;
          SetAllLinks([]);
          // api call to BE to get children
          //   CODE HERE
          getChilderen(p);
          //  setTreeData(...TreeData, res)
        } else {
          // hide kids
          SetAllLinks([]);
          // find only items without that parent id

          // closeallchildren(p);
          // /////////
          const result = TreeData.filter((node) => node.parent_id !== p);
          SetTreeData(result);
          localStorage.setItem("idea", JSON.stringify(result));
          item.show = false;
        }
      }
    });
  };
  // let temp = [];
  // const closeallchildren = (p) => {
  //   TreeData.map((item) => {
  //     console.log(item);
  //     if (item.parent_id === undefined) {
  //       console.log("k");
  //       return false;
  //     } else if (item.parent_id == p) {
  //       closeallchildren(item.id);
  //     } else if (item.parent_id != p) {
  //       temp.push(item);
  //     } else {
  //       return false;
  //     }
  //   });
  //   SetTreeData(TreeData[0], ...temp);
  // };

  const handleClick = () => {
    if (TreeData) {
      if (TreeData[0].show == "nothing") {
        TreeData[0].show = false;
        console.log("ew");
        localStorage.setItem("idea", JSON.stringify(TreeData));
      }
    }
  };
  let pathNumber = 1,
    strokeWidth = "5px",
    strokeColor = "#FFFFFfff";

  function generatepath() {
    TreeData ? (
      TreeData.map((data, key) => {
        key == 0 ? (
          <></>
        ) : (
          allLinks.push(["path" + key, data.parent_id, data._id])
        );
      })
    ) : (
      <></>
    );
  }

  const path = () => {
    let newpath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    let svgContainer = document.getElementById("tree__svg-container__svg");
    newpath.id = "path" + pathNumber;
    newpath.setAttribute("stroke", strokeColor);
    newpath.setAttribute("fill", "none");
    newpath.setAttribute("stroke-width", strokeWidth);
    svgContainer.appendChild(newpath);
    pathNumber++;
  };

  function connectCard() {
    let svg = document.getElementById("tree__svg-container__svg");
    // console.log(TreeData);
    generatepath();
    // console.log(allLinks);
    svg.innerHTML = "";
    for (let i = 0; allLinks.length > i; i++) {
      path();
    }
    for (let i = 0; allLinks.length > i; i++) {
      // console.log(document.getElementById(allLinks[i]));
      connectElements(
        svg,
        document.getElementById(allLinks[i][0]),
        document.getElementById(allLinks[i][1]),
        document.getElementById(allLinks[i][2])
      );
    }
  }

  function signum(x) {
    return x < 0 ? -1 : 1;
  }

  function absolute(x) {
    return x < 0 ? -x : x;
  }

  function drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)

    let stroke = parseFloat(path.getAttribute("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.getAttribute("height") < endY) svg.setAttribute("height", endY);
    if (svg.getAttribute("width") < startX + stroke)
      svg.setAttribute("width", startX + stroke);
    if (svg.getAttribute("width") < endX + stroke)
      svg.setAttribute("width", endX + stroke);

    let deltaX = (endX - startX) * 0.15;
    let deltaY = (endY - startY) * 0.15;
    // for further calculations which ever is the shortest distance
    let delta = deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    let arc1 = 0;
    let arc2 = 1;
    if (startX > endX) {
      arc1 = 1;
      arc2 = 0;
    }
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end
    path.setAttribute(
      "d",
      "M" +
        startX +
        " " +
        startY +
        " V" +
        (startY + delta) +
        " A" +
        delta +
        " " +
        delta +
        " 0 0 " +
        arc1 +
        " " +
        (startX + delta * signum(deltaX)) +
        " " +
        (startY + 2 * delta) +
        " H" +
        (endX - delta * signum(deltaX)) +
        " A" +
        delta +
        " " +
        delta +
        " 0 0 " +
        arc2 +
        " " +
        endX +
        " " +
        (startY + 3 * delta) +
        " V" +
        endY
    );
  }

  function connectElements(svg, path, startElem, endElem) {
    let svgContainer = document.getElementById("tree__svg-container");

    // if first element is lower than the second, swap!
    if (startElem.offsetTop > endElem.offsetTop) {
      let temp = startElem;
      startElem = endElem;
      endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container
    let svgTop = svgContainer.offsetTop;
    let svgLeft = svgContainer.offsetLeft;

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    let startX = startElem.offsetLeft + 0.5 * startElem.offsetWidth - svgLeft; // x = left offset + 0.5*width - svg's left offset
    let startY = startElem.offsetTop + startElem.offsetHeight - svgTop; // y = top offset + height - svg's top offset

    // calculate path's end (x,y) coords
    let endX = endElem.offsetLeft + 0.5 * endElem.offsetWidth - svgLeft;
    let endY = endElem.offsetTop - svgTop;
    // call function for drawing the path
    drawPath(svg, path, startX, startY, endX, endY);
  }

  useEffect(() => {
    connectCard();
  }, [TreeData]);

  useEffect(async () => {
    const idea = JSON.parse(localStorage.getItem("idea"));
    const id = localStorage.getItem("whose_id");
    // also check user_id == whosegraph
    if ((idea ? idea[0]._id : <></>) === idea_id) {
      // check if the idea is of the same person
      if (whosegraph == id) {
        console.log("asa");

        SetTreeData(JSON.parse(localStorage.getItem("idea")));

        if (idea[0].canEdit == true) {
          props.canIEdit(true);
          SetEdit(true);
        } else {
          props.canIEdit(false);
          SetEdit(false);
        }
      }
    } else {
      console.log("na");

      try {
        await axios
          .get(
            `/api/feature/features-by-parent?idea_id=${idea_id}&version=${version}&whosegraph=${whosegraph}`,
            {
              headers: authHeader(),
            }
          )
          .then(
            (res) => {
              SetTreeData(res.data.features);
              // console.log(res.data.features);
              if (res.data.features[0].canEdit == true) {
                props.canIEdit(true);
                SetEdit(true);
              } else {
                props.canIEdit(false);
                SetEdit(false);
              }
              localStorage.setItem("idea", JSON.stringify(res.data.features));
              localStorage.setItem("whose_id", res.data.whose_id);
            },
            (err) => {
              console.log(err);
            }
          );
      } catch (e) {
        console.log(e);
      }
    }
  }, []);
  return (
    // <div style={{ height: window.innerHeight, width: window.innerWidth }}>

    <div style={{ height: window.innerHeight, width: window.innerWidth }}>
      <div>
        <div id="mytree">
          <div id="tree__svg-container">
            <svg id="tree__svg-container__svg"></svg>
          </div>
          <div id="tree__container">
            <div className="tree__container__step__card" id={idea_id}>
              <div className="dropdown">
                <p
                  className="tree__container__step__card__p"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* {console.log(TreeData)} */}
                  {TreeData ? TreeData[0].title : <></>}
                </p>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link className="dropdown-item" to={"../idea/" + idea_id}>
                      {Edit ? <>Edit</> : <>View</>}
                    </Link>
                  </li>

                  {Edit ? (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={"/createFeature/" + idea_id + "/" + idea_id}
                        onClick={handleClick}
                      >
                        Add Child
                      </Link>
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
                {TreeData ? (
                  !(TreeData[0].show === "nothing") && (
                    <button
                      className="HideShow relative"
                      onClick={() => Clicked(idea_id)}
                      style={{
                        color: "white",
                        backgroundColor: "red",
                        height: "25px",
                        width: "25px",
                        right: "-5px",
                        borderRadius: "20px",
                      }}
                    >
                      {TreeData ? (
                        (!TreeData[0].show && "+") || (TreeData[0].show && "-")
                      ) : (
                        <></>
                      )}
                    </button>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div
              id="from_tree__container__step__card__first"
              className="tree__container__branch"
            >
              {/* {console.log(TreeData)} */}
              <Graph_Iterate_root
                tree={TreeData ? TreeData : []}
                _id={idea_id}
                // pathno={1}
                Clicked={Clicked}
                Edit={Edit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
