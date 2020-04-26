import React, { useState } from 'react'
import ToolbarModel from "../../../Models/Toolbar";
import legend from '../../../img/icon/legend.svg'
const LegendTool = () => {
  const [isVis, setVis] = useState(false);

  const legendStatus = () => {
    isVis
      ? ToolbarModel.handleLegendStatus(false)
      : ToolbarModel.handleLegendStatus(true);
    isVis ? setVis(false) : setVis(true);
  }
  return (
    <button type="button" className="tools-big-btn" onClick={() => legendStatus()}>
      <span>
        <img src={legend} alt="Legend" />
      </span>
      <span className="main-caption">Lejant</span>
    </button >
  )
}

export default LegendTool
