import React, { useState } from 'react'
import ToolbarModel from "../../../Models/Toolbar";
import swipe from '../../../img/icon/swipe.svg'


const SwipeTool = () => {
    const [isVis, setVis] = useState(false);

    const swipeStatus = () => {
        isVis
            ? ToolbarModel.handleSwipeStatus(false)
            : ToolbarModel.handleSwipeStatus(true);
        isVis ? setVis(false) : setVis(true);
    }
    return (
        <button type="button" className="tools-big-btn" onClick={() => swipeStatus()}>
            <span>
                <img src={swipe} alt="Swipe" />
            </span>
            <span className="main-caption">Swipe</span>
        </button >
    )
}

export default SwipeTool
