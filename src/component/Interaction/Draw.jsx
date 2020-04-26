import { useState, useEffect, useContext } from "react";
import ToolbarModel from "../../Models/Toolbar";
import EditorModel from "../../Models/Editor";
import { MapContext } from "../Map/MapContext";

const DrawInteraction = () => {
  const { map, vectorSource } = useContext(MapContext);
  const [type, setType] = useState();
  const [freehand, updateFreehand] = useState();

  useEffect(() => {
    const updateDrawType = (drawType) => {
      setType(drawType);
    };
    EditorModel.on("onDrawType", updateDrawType);
    return () => {
      EditorModel.off("onDrawType", updateDrawType);
    };
  }, [type]);

  //#region  
  useEffect(() => {
    const statusFreehand = (isChecked) => {
      updateFreehand(isChecked)
    };
    ToolbarModel.on("onFreehandChecked", statusFreehand);
    return () => {
      ToolbarModel.off("onFreehandChecked", statusFreehand);
    };
  });
  //#endregion

  //#region Add Ineraction
  useEffect(() => {
    if (typeof type !== "undefined") {
      if (type === "None") {
        EditorModel.RemoveDraw()
      } else if (type === "Clear") {
        const editTools = document.getElementById("editTools")
        editTools.className = "tool-box passive-box"
        EditorModel.RemoveDraw()
        vectorSource.clear();
        //#region advanced tool işleri 
        // ToolbarModel.isSnapActive(false);    
        // ToolbarModel.isSnapChecked(false);
        //#endregion
      }
      else {
        EditorModel.RemoveDraw()
        if (type === "LineString" || type === "Polygon") {
          //#region advanced tool işleri

          ToolbarModel.isFreehandActive(true);
          //#endregion
        }
        else {
          //#region advanced tool işleri   
          ToolbarModel.isFreehandChecked(false);
          ToolbarModel.isFreehandActive(false);
          //#endregion
        }
        //#region advanced tool işleri
        ToolbarModel.isSnapActive(true);
        ToolbarModel.handleSelectStatus(false);
        ToolbarModel.handleCoordinateWinStatus(false);
        //#endregion        
        EditorModel.AddDraw(map, vectorSource, type, freehand)

        // draw.on("drawstart", () => {          
        //   editTools.className = "tool-box"

        // });
      }
    }
  })

  //#endregion

  return null;
};
export default DrawInteraction;


