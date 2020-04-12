import React, { useRef, useEffect, useState } from "react";
import SnapTool from "./SnapTool";
import ToolbarModel from "../../../../Models/Toolbar";
import ModifyTool from "./ModifyTool";
import TranslateTool from "./TranslateTool";
const ToolOption = () => {
  const [interaction, setInt] = useState();
  const opt = useRef();
  const [isChecked, updateChecked] = useState(false);

  useEffect(() => {
    const getInteraction = (isThereInteraction) => {
      setInt(isThereInteraction);

      toolStatus(isThereInteraction);
    };
    ToolbarModel.on("onInteraction", getInteraction);
    return () => {
      ToolbarModel.off("onInteraction", getInteraction);
    };
  }, [interaction]);

  const toolStatus = (isThereInteraction) => {
    isThereInteraction ? updateChecked(true) : updateChecked(false);
  };

  return (
    <div className="options-tools-content" ref={opt}>
      <div className="tools">
        <SnapTool isChecked={isChecked} />
        <ModifyTool isChecked={isChecked} />
        <TranslateTool isChecked={isChecked} />
      </div>
      <div className="toolHader">
        <span>Gelişmiş Çizim Araçları</span>        
      </div>
    </div>
  );
};

export default ToolOption;
