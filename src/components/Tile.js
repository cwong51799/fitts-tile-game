import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pickANewHighlight, incrementScore, updatePrevXYCoord, endGame } from '../redux/settingActions'

class Tile extends Component {
    isHighlighted() {
        return this.props.highlightedTiles.includes(this.props.id)
    }

    _handleClick(e) {
        if(this.isHighlighted()) {
            document.getElementById("tile_"+this.props.id).innerHTML = ""
            this.props.incrementScore()
            this.props.updatePrevXYCoord(e.clientX, e.clientY)
            this.props.pickANewHighlight(this.props.id)
        } else {
            this.props.endGame()
        }
    }

    calculateID(el) {
        // MAKE PREDICTION
        // GET DISTANCE
        var centerX = el.getBoundingClientRect().x + (el.getBoundingClientRect().width/2)
        var centerY = el.getBoundingClientRect().y + (el.getBoundingClientRect().height/2)
        var a = centerX - this.props.prevX
        var b = centerY - this.props.prevY
        var distance = Math.sqrt(a*a, b*b)
        var id = Math.log((2*distance) / 100)
        if (id < 0) {
            id = 0;
        }
        var prediction = this.props.RegressionModel.predict(id).toFixed(0);
        document.getElementById("tile_"+this.props.id).innerHTML = prediction+"ms"
    }

    render() {
        return (
            <div className="tile" 
            id={"tile_"+this.props.id}
            ref={el=> {
                if (this.isHighlighted()) {
                    if (!el) {
                        return;
                    } else {
                        if (this.props.RegressionModel != null) {
                            this.calculateID(el)
                        }
                    }
                }
            }}
            style={{backgroundColor : this.isHighlighted() ? "black" : "white"}} 
            onClick={(e) => this._handleClick(e)}>

            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        pickANewHighlight : (tileToBeReplaced) => {
            dispatch(pickANewHighlight(tileToBeReplaced))
        },
        incrementScore : () => {
            dispatch(incrementScore())
        },
        updatePrevXYCoord : (x,y) => {
            dispatch(updatePrevXYCoord(x,y))
        },
        endGame : () => {
            dispatch(endGame())
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        highlightedTiles : state.highlightedTiles,
        RegressionModel : state.RegressionModel,
        prevX : state.prevX,
        prevY : state.prevY,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile)