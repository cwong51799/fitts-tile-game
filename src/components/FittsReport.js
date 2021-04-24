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
        if (this.props.totalClickEntries.length === 0) {
            return (
                <div className="centerWithinMe">            
                    <h3>There are no entries to display stats for!</h3>
                    <Button onClick={(e)=>this.props.resetGame()}>Try again</Button>
                </div>
            )

        } else {
            return (
                <div className="centerWithinMe">
                    <h3>Session Report</h3>
                    <StatChart/>
                    <div>
                    <h5 className="stylish-heading">Current Regression Model</h5>
                    <p>{this.props.RegressionModel == null ? "N/A" : this.props.RegressionModel.toString()}</p>
                    <h5 className="stylish-heading">Average Index of Performance (Throughput)</h5>
                    <p>{this.props.avgIP} bits/second</p>
                    </div>
                    <h5 className="stylish-heading">Input Entries (size: {this.props.totalClickEntries.length})</h5>
                    <div><FittsDisplay fullDisplay={true}/></div>
                    <h5 className="stylish-heading">Score</h5>
                    <p>{this.props.score}</p>
                    <Button onClick={(e)=>this.props.resetGame()}>Try again</Button>
                </div>
            );
        }
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
        avgIP : state.AvgIP,
        RegressionModel : state.RegressionModel,
        score : state.score,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FittsReport)