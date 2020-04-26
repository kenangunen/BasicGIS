import EventEmitter from 'eventemitter3'
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { Snap } from "ol/interaction";
import { Draw } from "ol/interaction";
import { Select } from "ol/interaction";
import FillPattern from 'ol-ext/style/FillPattern'

class EditorModel extends EventEmitter {
    constructor() {
        super()
        this.drawStartStyles = [
            new Style({
                stroke: new Stroke({
                    color: "#28A745",
                    width: 3,
                    lineDash: [10, 10],
                }),
                image: new CircleStyle({
                    radius: 5,
                    fill: new Fill({
                        color: "#28A745",
                    }),
                }),
                fill: new Fill({
                    color: "rgba(40, 167, 69, .2)",
                }),
            }),
        ];
        this.draw = null
        this._map = null
        this._source = null
        this._freehand = false
        this.editTools = document.getElementById("editTools")
        this.snap = null
        //#region symbology variable
        this.select = new Select({ hitTolerance: 3 });
        this._lineColor = null
        this._fillColor = null
        this._lineWidth = null
        this._currentPattern = null
        this.newStyle = []
        this._isItOn = false
        //#endregion
    }

    //#region draw 
    handleDrawType(type) {
        this.emit('onDrawType', type)
    }
    AddDraw(map, vectorSource, type, freehand) {
        this._map = map
        this._source = vectorSource
        if (typeof freehand !== "undefined") {
            this._freehand = freehand
        }

        this.draw = new Draw({
            source: vectorSource,
            style: this.drawStartStyles,
            type: type,
            freehand: this._freehand
        });
        this._map.addInteraction(this.draw)

        this.draw.on("drawstart", () => {
            const editTools = document.getElementById("editTools")
            editTools.className = "tool-box"

        });
    }
    RemoveDraw() {
        if (this._map !== null) {
            this._map.removeInteraction(this.draw)
        }
    }
    //#endregion

    //#region edit 
    handleEditType(type) {
        this.emit('onEditType', type)
    }
    //#endregion

    //#region snap 
    AddSnap() {
        this.snap = new Snap({ source: this._source });
        this._map.addInteraction(this.snap)
    }
    RemoveSnap() {
        this._map.removeInteraction(this.snap)
    }
    //#endregion

    //#region symbology 
    handleSymbology(lineColor, fillColor, lineWidth, currentPattern) {
        this._lineColor = lineColor
        this._fillColor = fillColor
        this._lineWidth = lineWidth
        this._currentPattern = currentPattern
        const newStyle = { lineColor: this._lineColor, fillColor: this._fillColor, lineWidth: this._lineWidth, currentPattern: this._currentPattern }
        this.emit('onSymbology', newStyle)
    }
    SymWinVisib(isVisib) {
        this.emit('onVisibility', isVisib)
    }
    onSetSeymbology(lineColor, fillColor, lineWidth, currentPattern) {
        this._isItOn = true
        this._map.removeInteraction(this.select)
        this._lineColor = lineColor
        this._fillColor = fillColor
        this._lineWidth = lineWidth
        this._currentPattern = currentPattern
        this._map.addInteraction(this.select)

        if (this._currentPattern === "none") {
            this.newStyle = [
                new Style({
                    stroke: new Stroke({
                        color: `rgba(${this._lineColor.r}, ${this._lineColor.g}, ${this._lineColor.b}, ${this._lineColor.a})`,
                        width: this._lineWidth
                    }),
                    image: new CircleStyle({
                        radius: 5,
                        fill: new Fill({
                            color: `rgba(${this._fillColor.r}, ${this._fillColor.g}, ${this._fillColor.b}, ${this._fillColor.a})`
                        })
                    }),
                    fill: new Fill({
                        color: `rgba(${this._fillColor.r}, ${this._fillColor.g}, ${this._fillColor.b}, ${this._fillColor.a})`
                    })
                })
            ]
        } else {
            this.newStyle = [
                new Style({
                    stroke: new Stroke({
                        color: `rgba(${this._lineColor.r}, ${this._lineColor.g}, ${this._lineColor.b}, ${this._lineColor.a})`,
                        width: this._lineWidth
                    }),
                    image: new CircleStyle({
                        radius: 5,
                        fill: new Fill({
                            color: `rgba(${this._fillColor.r}, ${this._fillColor.g}, ${this._fillColor.b}, ${this._fillColor.a})`
                        })
                    }),
                    fill: new FillPattern({
                        pattern: this._currentPattern,
                        color: `rgba(${this._fillColor.r}, ${this._fillColor.g}, ${this._fillColor.b}, ${this._fillColor.a})`,
                        spacing: 8
                    })
                })
            ]
        }
        this.select.on("select", (e) => {
            const f = e.selected[0];
            this.select.getFeatures().remove(f);
            f.setStyle(this.newStyle)
        });
    }
    offSetSeymbology() {
        if (this._isItOn) {
            this._map.removeInteraction(this.select)
        }
        this._isItOn = false

    }
    //#endregion

}

export default (new EditorModel())