import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pickANewHighlight, incrementScore, updatePrevXYCoord, resetGame } from '../redux/settingActions'

class Tile extends Component {
    isHighlighted() {
        return this.props.highlightedTiles.includes(this.props.id)
    }

    _handleClick(e) {
        if(this.isHighlighted()) {
            this.props.incrementScore()
            this.props.updatePrevXYCoord(e.clientX, e.clientY)
            this.props.pickANewHighlight(this.props.id)
        } else {
            this.props.resetGame()
        }
    }

    render() {
        return (
            <div className="tile" style={{backgroundColor : this.isHighlighted() ? "black" : "white"}} onClick={(e) => this._handleClick(e)}/>
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
        resetGame : () => {
            dispatch(resetGame())
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        highlightedTiles : state.highlightedTiles
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile)