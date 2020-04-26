import { useEffect, useState, useContext } from 'react'
import EditorModel from "../../Models/Editor";
import { MapContext } from "../Map/MapContext";
import Transform from 'ol-ext/interaction/Transform'
import DrawHole from 'ol-ext/interaction/DrawHole'
import { Modify } from "ol/interaction";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import "ol-ext/dist/ol-ext.css"

const EditInteraction = () => {
    const { map, vectorSource } = useContext(MapContext);
    const [type, setType] = useState();

    const [interaction, setInteraction] = useState();

    useEffect(() => {
        const updateEditType = (editType) => {
            setType(editType);
        };
        EditorModel.on("onEditType", updateEditType);
        return () => {
            EditorModel.off("onEditType", updateEditType);
        };
    }, [type]);
    useEffect(() => {
        if (interaction !== undefined) {
            map.removeInteraction(interaction);
        }
        addInteraction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type]);

    //#region Add interactions    
    const addInteraction = () => {
        if (type === "scale") {
            const olTransform = new Transform({
                enableRotatedTransform: false,
                hitTolerance: 2,
                translateFeature: false,
                scale: true,
                rotate: false,
                translate: false,
                stretch: true
            });
            map.addInteraction(olTransform)
            setInteraction(olTransform)
        } else if (type === "rotate") {
            const olTransform = new Transform({
                enableRotatedTransform: true,
                translateFeature: false,
                hitTolerance: 2,
                scale: false,
                rotate: true,
                translate: false,
            });
            map.addInteraction(olTransform)
            setInteraction(olTransform)
        } else if (type === "translate") {
            const olTransform = new Transform({
                enableRotatedTransform: false,
                hitTolerance: 2,
                translateFeature: true,
                scale: false,
                rotate: false,
                stretch: false
            });
            map.addInteraction(olTransform)
            setInteraction(olTransform)
        } else if (type === "modify") {
            const drawStartStyles = [
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
            const modify = new Modify({
                source: vectorSource,
                style: drawStartStyles,
            });
            map.on('pointermove', function (e) {
                var pixel = map.getEventPixel(e.originalEvent);
                var hit = map.hasFeatureAtPixel(pixel);
                map.getViewport().style.cursor = hit ? 'pointer' : '';
            });
            map.addInteraction(modify);
            setInteraction(modify);
        } else if (type === "drawHole") {
            const drawhole = new DrawHole(
                {
                    layers: vectorSource
                });
            map.addInteraction(drawhole);
            setInteraction(drawhole);
        }
    }
    //#endregion


    return null
}
export default EditInteraction