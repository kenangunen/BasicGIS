import EventEmitter from 'eventemitter3'

class LayerContextMenuModel extends EventEmitter {
    constructor() {
        super()
        this.action = ""
    }
    handleAction(actionType) {
        this.action = actionType
        this.emit('handleAction', actionType)
    }

    getAction() {
        return this.action
    }
}

export default (new LayerContextMenuModel())