import { useContext, useEffect, useState } from "react";
import { Translate, Select } from "ol/interaction";
import { MapContext } from "../Map/MapContext";
import ToolbarModel from "../../Models/Toolbar";

const TranslateConfig = () => {
  const { map } = useContext(MapContext);
  const [select, updateSelect] = useState();

  useEffect(() => {
    const statusTranslate = (isChecked) => {
      setTranslateStatus(isChecked); 
    };
    ToolbarModel.on("onTranslate", statusTranslate);
    return () => {
      ToolbarModel.off("onTranslate", statusTranslate);
    };
  });

  useEffect(() => {
    const getSelect = (select) => {
      updateSelect(select);
    };
    ToolbarModel.on("onSelect", getSelect);
    return () => {
      ToolbarModel.off("onSelect", getSelect);
    };
  }, [select]);

  const setTranslateStatus = (isChecked) => {
    console.log(true);
    
    
    ToolbarModel.handleDrawType("None");
    if (typeof select !== "undefined") {
      console.log(select);
      
      const translate = new Translate({
        features: select.getFeatures(),
      });

      map.addInteraction(select);
     
      isChecked
        ? map.addInteraction(translate)
        : map.removeInteraction(translate);
    }
  };

  return null;
};
export default TranslateConfig;
