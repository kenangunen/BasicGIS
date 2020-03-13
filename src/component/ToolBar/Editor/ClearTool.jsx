import React from "react";
import ToolbarModel from "../../../Models/Toolbar";
const ClearTool = () => { 
  return (
      <div className="tools">
        <button
          type="button" 
          className = "btn-tool"
          onClick={() => ToolbarModel.handleClearStatus("Clear")}
        >
          <i className="fas fa-ban" title="Clear"></i>
        </button>
      </div>
    
  );
};

export default ClearTool;
