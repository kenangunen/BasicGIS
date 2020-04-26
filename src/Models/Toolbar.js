import EventEmitter from 'eventemitter3'

class ToolbarModel extends EventEmitter {

    //#region Advanced Tool'ların aktif pasif işlemleri
    isSnapActive(isActive) {
        this.emit('onSnapActive', isActive)
    }

    isFreehandActive(isActive) {
        this.emit('onFreehandActive', isActive)
    }
    //#endregion

    //#region Advanced Tool'ların  tıklanıp tıklanmadığı işlemleri
    isSnapChecked(isChecked) {
        this.emit('onSnapChecked', isChecked)
    }
    isFreehandChecked(isChecked) {
        this.emit('onFreehandChecked', isChecked)
    }

    //#endregion   

    //#region Tools 
    handleCoordinateWinStatus(isVisible) {
        this.emit('onCoordinateWin', isVisible)
    }
    handleSwipeStatus(isActive) {
        this.emit('onSwipe', isActive)
    }
    handleLegendStatus(isActive) {
        this.emit('onLegend', isActive)
    }

    //#endregion

    //#region select 
    handleSelectStatus(isSelected) {
        this.emit('onSelectStatus', isSelected)
    }

    handleSelect(select) {
        this.emit('onSelect', select)
    }

    handleSelectEvent(selectedFeature) {
        this.emit('onSelectEvent', selectedFeature)
    }
    //#endregion

}

export default (new ToolbarModel())