import React, { useState, useEffect, useContext } from "react";
import ToolbarModel from "../../Models/Toolbar";
import { MapContext } from "../Map/MapContext";

const Clear = () => {
  const { map, vectorSource } = useContext(MapContext);
  const [type, setType] = useState(ToolbarModel.getClearStatus());
  const [interaction, setInteraction] = useState(ToolbarModel.getInteraction());

  useEffect(() => {
    ToolbarModel.on("onClear", _type => {
      setType(_type);
    });
  }, [type]);

  useEffect(() => {
    ToolbarModel.on("onInteraction", _interaction => {
      setInteraction(_interaction);
    });
  }, [interaction]);

  useEffect(() => {
      if(type){
        vectorSource.clear()
        map.removeInteraction(interaction)
      }
   
  });

  return null;
};

export default Clear;
