import EventEmitter from 'eventemitter3'

class LayerContextMenuModel extends EventEmitter {
    constructor() {
        super()
        this.action = []
        this.selectedLayer = []
    }

    handleAction(actionType) {
        const id = this.selectedLayer.id
        this.action = [{ id, actionType }]
        this.emit('handleAction', this.action)
    }

    getAction() {
        return this.action
    }

    SelectedLayer(layer) {
        this.selectedLayer = layer
    }


}

export default (new LayerContextMenuModel())