import React, { Component } from 'react'
import Header from './Header'
import Board from './Board'
import Scoreboard from './Scoreboard'
import FittsDisplay from './FittsDisplay'
import FittsReport from './FittsReport'
import { connect } from 'react-redux'


class AppContainer extends Component {
    render() {
        return (
            <div>
                {this.props.GameOver ? 
                <div className="full-container">
                    <FittsReport/>
                </div>
                 : 
            <div className="full-container"> 
                 <div className="primary-container">
                    <Header/>
                    <Board/>
                    <Scoreboard/>
                 </div>
             </div>
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        GameOver : state.GameOver,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)