import EventEmitter from 'eventemitter3'

class SatelliteModel extends EventEmitter {
    constructor() {
        super()
        this.visib = false
    }

    handleVisibLayer() {
        this.emit('setVisib', this.visib)
    }

    getOverlayItems() {
        return this.overlayItems
    }


}

export default (new SatelliteModel())