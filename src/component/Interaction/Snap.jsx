import { useContext, useEffect } from "react";
import { Snap } from "ol/interaction";
import { MapContext } from "../Map/MapContext";
import ToolbarModel from "../../Models/Toolbar";

const SnapConfig = () => {
  const { map, vectorSource } = useContext(MapContext);

  useEffect(() => {
    const statusSnap = isChecked => {
      setSnapStatus(isChecked);
    };
    ToolbarModel.on("onSnap", statusSnap);
    return () => {
      ToolbarModel.off("onSnap", statusSnap);
    };
  });
  const snap = new Snap({ source: vectorSource });

  const setSnapStatus = isChecked => {
    isChecked ? map.addInteraction(snap) : map.removeInteraction(snap);
  };

  return null;
};
export default SnapConfig;
