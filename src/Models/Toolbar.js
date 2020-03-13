import EventEmitter from 'eventemitter3'

class ToolbarModel extends EventEmitter {
    constructor() {
        super()
        this.drawType = ""
        this._clear = ""
        this._interaction = null
        this._isActive = true
    }

    handleDrawType(type) {
        this.drawType = type
        this.emit('onDrawType', this.drawType)
    }
    getDrawType() {
        return this.drawType
    }

    handleClearStatus(clear) {
        this._clear = clear
        this.emit('onClear', this._clear)
    }

    getClearStatus() {
        return this._clear
    }

    handleInteraction(interaction) {
        this._interaction = interaction
        this.emit('onInteraction', this._interaction)

    }

    getInteraction(isActive) {

        return this._interaction
    }

    handleSnap(isActive) {
        this._isActive = isActive
    }

}

export default (new ToolbarModel())