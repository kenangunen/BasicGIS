import React, { useRef, useEffect, useState } from "react";
import SnapTool from "./SnapTool";
import ToolbarModel from "../../../../Models/Toolbar";
import ModifyTool from "./ModifyTool";
import TranslateTool from "./TranslateTool";
const ToolOption = () => {
  const [interaction, setInt] = useState();
  const opt = useRef();

  useEffect(() => {
    const getInteraction = effect => {
      setInt(effect);

      toolStatus(effect);
    };
    ToolbarModel.on("onInteraction", getInteraction);
    return () => {
      ToolbarModel.off("onInteraction", getInteraction);
    };
  }, [interaction]);

  const toolStatus = effect => {
    const optSection = opt.current;
    if (effect) {
      optSection.style.opacity = "1";
      optSection.style.pointerEvents = "auto";
    } else {
      optSection.style.opacity = ".3";
      optSection.style.pointerEvents = "none";
    }
  };

  return (
    <div className="options" ref={opt}>
      <SnapTool />
      <ModifyTool />
      <TranslateTool />
    </div>
  );
};

export default ToolOption;
