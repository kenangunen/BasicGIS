import React, { useEffect, useState } from "react";
import CoordinateListWindow from "./CoordinateListWindow";
import ToolbarModel from "../../Models/Toolbar";

const Tools = () => {
  const [visib, setVisib] = useState();
  useEffect(() => {
    const updateVisiblety = isVisible => {
      setVisib(isVisible);
    };
    ToolbarModel.on("onCoordinateWin", updateVisiblety);

    return () => {
      ToolbarModel.off("onCoordinateWin", updateVisiblety);
    };
  });

  return <div>{visib && <CoordinateListWindow />}</div>;
};

export default Tools;
