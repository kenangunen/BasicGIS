import React from "react";
import ToolbarModel from "../../../../Models/Toolbar";

const TranslateTool = (props) => {
  const {isChecked} = props
  const onTranslate = (e) => {
    const isChecked = e.target.checked;
    ToolbarModel.handleTranslateStatus(isChecked);
  };
  return (
    <div className="check-tool">
      <div className="pretty p-default p-curve p-thick p-smooth">
      {isChecked ? (<input type="checkbox" onChange={(e) => onTranslate(e)} />) : (<input type="checkbox" disabled onChange={(e) => onTranslate(e)} />)}        
        <div className="state p-info-o">
          <label>Translate</label>
        </div>
      </div>
    </div>
  );
};

export default TranslateTool;
