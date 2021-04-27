import React, { Component } from 'react';
import { Button } from 'react-materialize';
import { loadInPremadeEntries, resetGame, setAvgIndexOfPerformance, setChartData, setRegressionModel } from '../redux/settingActions'
import { connect } from 'react-redux'
import FittsDisplay from './FittsDisplay';
import * as MathUtilities from '../math/MathUtilities'
import StatChart from './StatChart';


class FittsReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            needsRefresh : false,
        }
    }

    componentDidMount() {
        this.updateData()
    }

    demandRefresh() {
        this.setState({
            needsRefresh : true,
        })
    }

    signalRefreshed() {
        this.setState({
            needsRefresh : false,
        })
    }

    updateData() {
        this.props.setRegressionModel(MathUtilities.calculateLinearRegression(this.props.totalClickEntries))
        this.props.setChartData(MathUtilities.getChartReadyData(this.props.totalClickEntries))
        this.props.setAvgIndexOfPerformance(MathUtilities.getAverageIndexOfPerformance(this.props.totalClickEntries))
    }
    

    render() {
        // For saving entries 
        //console.log(JSON.stringify(this.props.totalClickEntries))
        if (this.state.needsRefresh) {
            this.updateData();
            this.signalRefreshed()
        }
        if (this.props.totalClickEntries.length === 0) {
            return (
                <div className="centerWithinMe">            
                    <h3>There are no entries to display stats for!</h3>
                    <Button onClick={(e)=> {
                        this.props.resetGame()
                    }}>Try again</Button>
                </div>
            )

        } else {
            return (
                <div className="centerWithinMe">
                    <h3>Session Report</h3>
                    <h5 className="stylish-heading centerWithinMe">Application of Fitts' Law</h5>
                    <p className="desc">According to Fitts' Law, the time it takes to move your cursor from one tile to another is a function of the distance between them.
                    Using the distance and the fixed width of the tiles, we can calculate the ID (Index of Difficulty, ID=log(2D/W)) between each pair of tiles. We can use 
                    linear regression to build a model to predict the time needed to click a destination tile. Your subsequent rounds will have the current model's prediction. 
                    Play more rounds to feed the model so it can make more accurate predictions!
                    </p>
                    <h5 className="stylish-heading">Performance Graph</h5>
                    <StatChart/>
                    <div>
                    <h5 className="stylish-heading">Current Regression Model</h5>
                    <p>{this.props.RegressionModel == null ? "N/A" : this.props.RegressionModel.toString()}</p>
                    <h5 className="stylish-heading">Average Index of Performance (Throughput)</h5>
                    <p>{this.props.avgIP} bits/second</p>
                    </div>
                    <h5 className="stylish-heading">Input Entries (size: {this.props.totalClickEntries.length})</h5>
                    <div><FittsDisplay fullDisplay={true}/></div>
                    <Button onClick={(e)=> {
                        this.props.loadInPremadeEntries()
                        this.demandRefresh()
                    }}>Load Premade Data</Button>
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
        },
        loadInPremadeEntries : () => {
            dispatch(loadInPremadeEntries())
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