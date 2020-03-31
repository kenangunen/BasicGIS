import { useState, useEffect, useContext } from "react";
import ToolbarModel from "../../Models/Toolbar";
import { MapContext } from "../Map/MapContext";
import { Draw } from "ol/interaction";

const DrawInteraction = () => { 
  const { map, vectorSource } = useContext(MapContext);
  const [type, setType] = useState();
  const [interaction, setInteraction] = useState();
 
  useEffect(() => {
    const updateDrawType = drawType => {
      setType(drawType);
    };
    ToolbarModel.on("onDrawType", updateDrawType);
    return () => {
      ToolbarModel.off("onDrawType", updateDrawType);
    };
  }, [type]);

  useEffect(() => {
    if (interaction !== undefined) {
      map.removeInteraction(interaction);
    }
    addDraw();
  }, [type]);

  const addDraw = () => {
    if (type) {
      if (type === "None") {
        map.removeInteraction(interaction);
      } else if (type === "Clear") {
        vectorSource.clear();
        //ToolbarModel.handleInteraction(false);
      } else {
        const draw = new Draw({
          source: vectorSource,
          type: type
        });
        map.addInteraction(draw);
        setInteraction(draw);

        draw.on("drawstart", () => {
          ToolbarModel.handleInteraction(draw);
        });
      }
    }
  };

  return null;
};
export default DrawInteraction;
