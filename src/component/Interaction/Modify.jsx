import { useContext, useState, useEffect } from "react";
import { MapContext } from "../Map/MapContext";
import ToolbarModel from "../../Models/Toolbar";
import { Modify, Select } from "ol/interaction";

const ModifyConfig = () => {
  const { map } = useContext(MapContext);
  const [, setActive] = useState(false);

  useEffect(() => {
    const statusModify = isChecked => {
      setActive(isChecked);
      setModifyStatus(isChecked);
    };
    ToolbarModel.on("onModify", statusModify);
    return () => {
      ToolbarModel.off("onModify", statusModify);
    };
  }, []);

  const select = new Select();

  const modify = new Modify({ features: select.getFeatures() });

  const setModifyStatus = isChecked => {
    map.addInteraction(select);
    ToolbarModel.handleDrawType("None");
    isChecked ? map.addInteraction(modify) : map.removeInteraction(modify);
  };

  return null;
};
export default ModifyConfig;
