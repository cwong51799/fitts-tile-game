import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import { connect } from 'react-redux'

class StatChart extends Component {
    render() {
        console.log("STAT CHART RENDERED")
        return (
            <Chart
              width={'1100px'}
              height={'400px'}
              chartType="ComboChart"
              loader={<div>Loading Chart</div>}
              data={this.props.ChartData}
              options={{
                title: 'Fitts Actual vs. Expected Value',
                hAxis: { title: 'Index of Difficulty'},
                vAxis: { title: 'Movement Time'},
                legend: '',
                seriesType: 'scatter',
                series: { 1: {type : 'line'}},
              }}
          />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        ChartData : state.ChartData
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatChart)