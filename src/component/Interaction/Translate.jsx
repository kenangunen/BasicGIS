import { useContext, useEffect } from "react";
import { Translate, Select } from "ol/interaction";
import { MapContext } from "../Map/MapContext";
import ToolbarModel from "../../Models/Toolbar";

const TranslateConfig = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    const statusTranslate = isChecked => {
      setTranslateStatus(isChecked);
    };
    ToolbarModel.on("onTranslate", statusTranslate);
    return () => {
      ToolbarModel.off("onTranslate", statusTranslate);
    };
  });
  const select = new Select();

  const translate = new Translate({
    features: select.getFeatures()
  });

  const setTranslateStatus = isChecked => {
    map.addInteraction(select);
    ToolbarModel.handleDrawType("None");
    isChecked
      ? map.addInteraction(translate)
      : map.removeInteraction(translate);
  };

  return null;
};
export default TranslateConfig;
