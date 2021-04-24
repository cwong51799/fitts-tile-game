import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import { connect } from 'react-redux'

class StatChart extends Component {
    render() {
        return (
            <Chart
              width={'600px'}
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
        entries : state.totalClickEntries,
        ChartData : state.ChartData
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatChart)