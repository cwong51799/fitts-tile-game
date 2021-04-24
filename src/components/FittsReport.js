import React, { Component } from 'react';
import { Button } from 'react-materialize';
import { resetGame, setAvgIndexOfPerformance, setChartData, setRegressionModel } from '../redux/settingActions'
import { connect } from 'react-redux'
import FittsDisplay from './FittsDisplay';
import * as MathUtilities from '../math/MathUtilities'

import StatChart from './StatChart';


class FittsReport extends Component {
    componentDidMount() {
        this.props.setRegressionModel(MathUtilities.calculateLinearRegression(this.props.totalClickEntries))
        this.props.setChartData(MathUtilities.getChartReadyData(this.props.totalClickEntries))
        this.props.setAvgIndexOfPerformance(MathUtilities.getAverageIndexOfPerformance(this.props.totalClickEntries))
    }

    render() {
        return (
            <div className="centerWithinMe">
                <h3>Fitts Report</h3>
                <StatChart/>
                <div>
                <h5>Average Index of Performance (Throughput)</h5>
                <p>{this.props.avgIP}</p>
                </div>
                <h5>Input Entries (size: {this.props.totalClickEntries.length})</h5>
                <div><FittsDisplay fullDisplay={true}/></div>
                <Button onClick={(e)=>this.props.resetGame()}>Try again</Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetGame : () => {
            dispatch(resetGame())
        },
        setRegressionModel : (model) => {
            dispatch(setRegressionModel(model))
        },
        setChartData : (data) => {
            dispatch(setChartData(data))
        },
        setAvgIndexOfPerformance : (avg) => {
            dispatch(setAvgIndexOfPerformance(avg))
        }
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        totalClickEntries : state.totalClickEntries,
        avgIP : state.AvgIP
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FittsReport)