import React, { Fragment, useState, useEffect, useRef } from 'react'
import EditorModel from "../../../Models/Editor";
import SymbologyWin from './SymbologyWin';
//#region svg 
import modify from "../../../img//icon/modify.svg";
import moveLyr from "../../../img//icon/moveLyr.svg";
import scale from "../../../img//icon/scale.svg";
import rotate from "../../../img//icon/rotate.svg";
import drawHole from "../../../img//icon/drawHole.svg";
import brush from "../../../img//icon/brush.svg";
//#endregion

const EditTools = () => {
    const [visibBrush, setVisib] = useState(false)
    const brushBtn = useRef()

    useEffect(() => {
        const updateVisib = (isVisib) => {
            setVisib(isVisib)
            brushBtn.current.style.backgroundColor = "transparent"
        }
        EditorModel.on('onVisibility', updateVisib)
        return () => {
            EditorModel.off('onVisibility', updateVisib)
        }
    }, [visibBrush])

    const callEditTools = (e) => {
        EditorModel.offSetSeymbology()
        EditorModel.handleDrawType("None");
        e.stopPropagation();
        const node = e.target.nodeName;
        if (node === "BUTTON") {
            const toolType = e.target.value;
            if (toolType !== "brush") {
                EditorModel.handleEditType(toolType);
            } else {
                setVisib(!visibBrush)
            }
            const buttons = document.querySelectorAll(".btn-tool")
            for (let btn of buttons) {
                btn.style.backgroundColor = "transparent";
                e.target.style.backgroundColor = "rgba(169, 169, 169, 0.5)";
                e.target.id = 1
            }
        }
    }
    return (
        <Fragment>
            <div id="editTools" className="tool-box passive-box" onClick={(e) => callEditTools(e)}>
                <div className="tools">
                    <button type="button" className="btn-tool" value="modify">
                        <img src={modify} alt="Modify" />
                    </button>
                    <button type="button" className="btn-tool" value="scale">
                        <img src={scale} alt="Scale" />
                    </button>
                    <button type="button" className="btn-tool" value="rotate">
                        <img src={rotate} alt="Rotate" />
                    </button>
                    <button type="button" className="btn-tool" value="translate">
                        <img src={moveLyr} alt="Translate" />
                    </button>
                    <button type="button" className="btn-tool" value="drawHole">
                        <img src={drawHole} alt="Draw Hole" />
                    </button>
                    <button type="button" className="btn-tool" value="brush" ref={brushBtn}>
                        <img src={brush} alt="Change Symbology" />
                    </button>
                </div>
                <div className="toolHader">
                    <span>Düzenleme Araçları</span>
                </div>
            </div>
            {visibBrush ? <SymbologyWin /> : null}

        </Fragment>
    )
}

export default EditTools
