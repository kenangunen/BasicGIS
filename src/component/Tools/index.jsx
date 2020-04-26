import React, { useEffect, useState } from "react";
import CoordinateListWindow from "./CoordinateListWindow";
import ToolbarModel from "../../Models/Toolbar";
import SwipeConfig from "./Swipe";
import AddToLegend from "./AddToLegend";

const Tools = () => {
  const [visibCoor, setVisibCoor] = useState(false);
  const [visibLegend, setVisibLegend] = useState(false);
  const [isActiveSwipe, setActiveSwipe] = useState(false);

  useEffect(() => {
    const updateVisiblety = isVisible => {
      setVisibLegend(isVisible);
    };
    ToolbarModel.on("onLegend", updateVisiblety);

    return () => {
      ToolbarModel.off("onLegend", updateVisiblety);
    };
  }, [visibLegend]);

  useEffect(() => {
    const updateCoorVisiblety = isVisible => {
      setVisibCoor(isVisible);
    };
    ToolbarModel.on("onCoordinateWin", updateCoorVisiblety);

    return () => {
      ToolbarModel.off("onCoordinateWin", updateCoorVisiblety);
    };
  }, [visibCoor]);

  useEffect(() => {
    const swipeStatus = (isActive) => {
      setActiveSwipe(isActive)
    }
    ToolbarModel.on("onSwipe", swipeStatus)
    return () => {
      ToolbarModel.off("onSwipe", swipeStatus)
    }
  })


  return <div>
    {visibCoor && <CoordinateListWindow />}
    <SwipeConfig isActive={isActiveSwipe} />
    {visibLegend && <AddToLegend />}
  </div>;
};

export default Tools;
