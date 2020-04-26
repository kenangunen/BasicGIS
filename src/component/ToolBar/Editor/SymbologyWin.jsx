import React, { useState, useRef } from 'react'
import EditorModel from "../../../Models/Editor";
import close from "../../../img//icon/close.svg";
import brush_2 from "../../../img//icon/brush_2.svg";
import "./symbologoy.scss"
import { AlphaPicker } from 'react-color';
import { CompactPicker } from 'react-color';
import FillPattern from 'ol-ext/style/FillPattern'


const SymbologyWin = () => {
  EditorModel.handleDrawType("None");
  const [color, setColor] = useState({
    r: '248',
    g: '20',
    b: '20',
    a: '1',
  })
  const [fillColor, setFillColor] = useState({
    r: '248',
    g: '20',
    b: '20',
    a: '0.2',
  })
  const [currentPattern, setCPattern] = useState("none")

  const patterns = FillPattern.prototype.patterns
  const patternColllect = []
  for (let i in patterns) {
    patternColllect.push(i)
  }

  const [lineWidth, setWidth] = useState(3)
  const lineColorPrew = useRef()
  const fillColorPrew = useRef()
  const patternPrew = useRef()
  const itemLine = useRef()
  const itemFill = useRef()
  const itemPattern = useRef()

  const handleClick = (e) => {
    const contentItem = e.target.parentElement.parentElement.parentElement

    const itemType = contentItem.id
    if (itemType === "line") {
      itemLine.current.style.height = "180px"
      itemFill.current.style.height = "24px"
      itemPattern.current.style.height = "24px"

    } else if (itemType === "fill") {
      itemLine.current.style.height = "24px"
      itemFill.current.style.height = "180px"
      itemPattern.current.style.height = "24px"
    } else {
      itemPattern.current.style.height = "300px"
      itemLine.current.style.height = "24px"
      itemFill.current.style.height = "24px"

    }
  };


  const handleChangeLine = (color) => {
    setColor(color.rgb)
    const rgb = color.rgb
    lineColorPrew.current.style.borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
  };

  const handleChangeFill = (color) => {
    setFillColor(color.rgb)
    const rgb = color.rgb
    fillColorPrew.current.style.background = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
  };

  const handleChangePattern = (patternName, bgImage, e) => {
    setCPattern(patternName)
    const patternType = e.target.title
    if (patternType !== "none") {
      patternPrew.current.style.backgroundImage = bgImage
      patternPrew.current.style.backgroundColor = "#f3f3f3"
    } else {
      setCPattern(patternType)
      patternPrew.current.style.background = "transparent"
    }


  }

  const closeWindow = () => {
    EditorModel.offSetSeymbology()
    EditorModel.SymWinVisib(false)
  }

  const changeWidth = (e) => {
    const changeTpey = e.target.id
    if (changeTpey === "upWidth") {
      const newWidth = lineWidth + 1
      lineColorPrew.current.style.borderWidth = `${newWidth}px`;
      setWidth(newWidth)
    } else {
      const newWidth = lineWidth - 1
      lineColorPrew.current.style.borderWidth = `${newWidth}px`;
      setWidth(newWidth)
    }
  }

  const setSymbology = () => {
    EditorModel.onSetSeymbology(color, fillColor, lineWidth, currentPattern)
  }


  return (
    <div className="window-sym">
      <div className="win-header">
        <img src={brush_2} alt="Header Logo" />
        <span className="header-text-lg">Semboloji</span>
        <img
          className="closeIMG"
          src={close}
          alt="Close Window"
          onClick={() => closeWindow()}
        />
      </div>
      <div className="win-container">
        <div className="sym-content">
          <div className="content-item" id="line" ref={itemLine}>
            <div className="sym-main">
              <div className="sym-label">
                <span>Çizgi Rengi</span>
              </div>
              <div className="sym-color" onClick={(e) => handleClick(e)}>
                <div className="colorLine" ref={lineColorPrew} />

              </div>
              <div className="line-width" onClick={(e) => changeWidth(e)}>
                <button id="upWidth"></button>
                <button id="downWidth"></button>
              </div>
            </div>
            <div className="popover">
              <CompactPicker color={color} onChange={handleChangeLine} />
              <AlphaPicker color={color} onChange={handleChangeLine} />
            </div>
          </div>
          <div className="content-item" id="fill" ref={itemFill}>
            <div className="sym-main">
              <div className="sym-label">
                <span>Dolgu Rengi</span>
              </div>
              <div className="sym-color" onClick={(e) => handleClick(e)}>
                <div className="color" ref={fillColorPrew} />
              </div>
            </div>
            <div className="popover">
              <CompactPicker color={fillColor} onChange={handleChangeFill} />
              <AlphaPicker color={fillColor} onChange={handleChangeFill} />
            </div>
          </div>

          <div className="content-item" id="pattern" ref={itemPattern}>
            <div className="sym-main">
              <div className="sym-label">
                <span>Desen</span>
              </div>
              <div className="sym-color" onClick={(e) => handleClick(e)}>
                <div className="pttrn" ref={patternPrew} />
              </div>

            </div>
            <div className="popover patternSettings">
              {patternColllect.map((pattern) => {
                const p = new FillPattern({ pattern: pattern })
                const bgImage = `url(${p.getImage().toDataURL()})`
                return (
                  <div key={pattern} title={pattern} className="pattern-img" style={{ backgroundImage: bgImage }} onClick={(e) => handleChangePattern(pattern, bgImage, e)}>
                  </div>
                )
              })}
              <div className="pattern-img" title="none" onClick={(e) => handleChangePattern("", "", e)}></div>
            </div>
          </div>
          <input className="setSym-btn" type="button" value="Tamam" onClick={setSymbology} />
        </div>


      </div>
    </div>

  )
}
export default SymbologyWin
