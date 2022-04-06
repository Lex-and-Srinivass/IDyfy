import React, { useState } from "react";
import Graph_3 from "./graph_3";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import OtherContributers from "./Other_Contributers";

const Graph_5 = () => {
  const [Edit, SetEdit] = useState(false);
  const canIEdit = (a) => {
    SetEdit(a);
    console.log(a);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div class="dropdown mt-2 offset-lg-6 col-sm-4 col-lg-2 col-4 ">
            <button
              class="btn btn-secondary dropdown-toggle "
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Versions
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item" href="">
                  Version 1
                </a>
              </li>
            </ul>
          </div>
          <div className="col-sm-4 col-lg-2 col-4 mt-2">
            <OtherContributers />
          </div>
          <div className="col-sm-4 col-lg-2 col-4 mt-2">
            <button className="btn btn-secondary ">Pull Idea</button>
          </div>
        </div>
      </div>
      <div>
        <TransformWrapper
          defaultScale={1}
          defaultPositionX={200}
          defaultPositionY={100}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className="tools">
                <button onClick={zoomIn}>+</button>
                <button onClick={zoomOut}>-</button>
                <button onClick={resetTransform}>x</button>
              </div>
              <TransformComponent>
                <Graph_3 canIEdit={canIEdit} />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    </>
  );
};
// import React, { useState, useEffect } from "react";
// import DragMove from "./drag";
// import Graph_3 from "./graph_3";

// const Graph_5 = () => {
//   const [translate, setTranslate] = useState({
//     x: 0,
//     y: 0,
//   });

//   const handleDragMove = (e) => {
//     setTranslate({
//       x: translate.x + e.movementX,
//       y: translate.y + e.movementY,
//     });
//   };

//   return (
//     <DragMove className="overflowY-hidden" onDragMove={handleDragMove}>
//       <div
//         style={{
//           transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
//         }}
//       >
//         <Graph_3 />
//       </div>
//     </DragMove>
//   );
// };
export default Graph_5;
