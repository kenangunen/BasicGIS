import EventEmitter from 'eventemitter3'

class AddDataModel extends EventEmitter {

    handleLayerInfo(layerInfo) {

        this.emit('onLayerInfo', layerInfo)
    }

    getAddedLayer() {
        return this._layerInfo
    }
}

export default (new AddDataModel())