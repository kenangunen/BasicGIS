import React from "react";
import ToolbarModel from "../../../../Models/Toolbar";

const TranslateTool = () => {
  const onTranslate = e => {
    const isChecked = e.target.checked;
    ToolbarModel.handleTranslateStatus(isChecked);
  };
  return (
    <div>
      <input type="checkbox" id="translate" onChange={e => onTranslate(e)} />
      <label htmlFor="translate">
        <span></span>Translate
      </label>
    </div>
  );
};

export default TranslateTool;
