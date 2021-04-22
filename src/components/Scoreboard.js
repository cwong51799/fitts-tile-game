import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetGame, setTime } from '../redux/settingActions'

class Scoreboard extends Component {
    countdown = () => {
        if (this.props.time === 1) {
            this.props.resetGame()
        }
        if (this.props.score > 0) {
            this.props.setTime(this.props.time-1)
        }
    }

    componentDidMount() {
        setInterval(this.countdown, 1000)
    }

    render() {
        if (this.props.score === 0) {
            return (
                <div className="centerWithinMe">
                <div>Click a Tile to Start</div>
                <div>You get 10 more seconds for every 10 tiles clicked</div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div>Score: {this.props.score}</div>
                    <div>Time: {this.props.time}</div>
                </div>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTime : (time) => {
            dispatch(setTime(time))
        },
        resetGame : () => {
            dispatch(resetGame())
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        score : state.score,
        time : state.time,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard)