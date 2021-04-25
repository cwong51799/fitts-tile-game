import React, { Component } from 'react'
import Header from './Header'
import Board from './Board'
import Scoreboard from './Scoreboard'
import FittsReport from './FittsReport'
import { connect } from 'react-redux'
import { Switch } from 'react-materialize'
import { toggleBorders } from '../redux/settingActions'


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
                    <Switch
                        id="Switch-11"
                        offLabel="Borders Off"
                        onChange={(e) => this.props.toggleBorders(e.target.checked)}
                        onLabel="Borders On"
                        checked={this.props.Borders}
                    />
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
        toggleBorders : (bool) => {
            dispatch(toggleBorders(bool))
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        GameOver : state.GameOver,
        Borders : state.Borders,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)