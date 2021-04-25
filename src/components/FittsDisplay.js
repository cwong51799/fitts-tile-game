import React, { Component } from 'react'
import { Table } from 'react-materialize'
import { connect } from 'react-redux'
import * as MathUtilities from '../math/MathUtilities'

class FittsDisplay extends Component {
    render() {
        return (
            <Table className={this.props.fullDisplay ? "scrollable" : ""}>
            <thead>
                <tr>
                <th data-field="distance">
                    Distance(px)
                </th>
                <th data-field="movement-time">
                    Movement Time(ms)
                </th>
                <th data-field="predicted-time">
                    Predicted Time(ms)
                </th>
                <th data-field="difference">
                    Difference (ms)
                </th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(this.props.fullDisplay ? this.props.totalClickEntries : this.props.currentClickEntries).map((key) => {
                    var entry = this.props.fullDisplay ? this.props.totalClickEntries[key] : this.props.currentClickEntries[key];
                    var predictedTime = this.props.regressionModel != null ? this.props.regressionModel.predict(parseFloat(MathUtilities.getIndexOfDifficulty(entry))).toFixed(0) : null
                    return(
                        <tr key={key}>
                            <td>
                                {entry.distance}
                            </td>
                            <td>
                                {entry.time}
                            </td>
                            <td>
                                {predictedTime == null ? "N/A" : predictedTime}
                            </td>
                            <td>
                                {predictedTime == null ? "N/A" : entry.time - predictedTime}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </Table>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentClickEntries : state.currentClickEntries,
        totalClickEntries : state.totalClickEntries,
        regressionModel : state.RegressionModel
    }
}

export default connect(mapStateToProps)(FittsDisplay)