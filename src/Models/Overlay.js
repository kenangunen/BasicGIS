import EventEmitter from 'eventemitter3'

class OverlayModel extends EventEmitter {
    constructor() {
        super()
        this.overlayItems = []
    }

    handleOverlayItems(id, offset, positioning, tooltipCoord) {
        this.overlayItems = [{ id, offset, positioning, tooltipCoord }]
        this.emit('onOverlay', this.overlayItems)
    }

    getOverlayItems() {
        return this.overlayItems
    }


}

export default (new OverlayModel())