import React, { useState } from "react";
import ToolbarModel from "../../../Models/Toolbar";

const DrawTools = () => {
  const [tools] = useState([
    { id: 0, className: "fas fa-mouse-pointer", title: "None", active: true },
    { id: 1, className: "far fa-dot-circle", title: "Point", active: true },
    {
      id: 2,
      className: "fas fa-bezier-curve",
      title: "LineString",
      active: true
    },
    { id: 3, className: "fas fa-draw-polygon", title: "Polygon", active: true },
    { id: 4, className: "far fa-circle", title: "Circle", active: true }
    // { id: 5, className: "fas fa-edit", title: "Edit", active: false }
  ]);

  const onClick = title => {
    ToolbarModel.handleDrawType(title);
  };

  return (
    <div className="tools">
      {tools.map(tool => {
        return (
          <button
            type="button"
            className={tool.active ? "btn-tool" : "btn-tool"}
            key={tool.id}
            onClick={() => onClick(tool.title)}
          >
            <i className={tool.className} title={tool.title}></i>
          </button>
        );
      })}
    </div>
  );
};

export default DrawTools;
