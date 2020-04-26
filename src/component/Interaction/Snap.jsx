import {useEffect } from "react";
import ToolbarModel from "../../Models/Toolbar";
import EditorModel from "../../Models/Editor";

const SnapConfig = () => {

  useEffect(() => {
    const statusSnap = (isChecked) => {      
      setSnapStatus(isChecked);
    };
    ToolbarModel.on("onSnapChecked", statusSnap);
    return () => {
      ToolbarModel.off("onSnapChecked", statusSnap);
    };
  });

  const setSnapStatus = (isChecked) => {    
    isChecked ? EditorModel.AddSnap() : EditorModel.RemoveSnap();   
  };

  return null;
};
export default SnapConfig;
