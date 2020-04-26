import { useEffect, useContext } from 'react'
import { MapContext } from "../Map/MapContext";
import ControlModel from "../../Models/Control"

const SwipeConfig = props => {
    const { isActive } = props
    const { map } = useContext(MapContext);
    useEffect(() => {
        if (typeof isActive !== "undefined") {
            if (isActive) {
                ControlModel.AddSwpControl(map)
            } else {
                ControlModel.RemoveSwpControl(map)
            }
        }
    })
    return (
        null
    )
}

export default SwipeConfig
