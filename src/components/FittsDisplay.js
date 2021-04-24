import React, { Component } from 'react'
import { Table } from 'react-materialize'
import { connect } from 'react-redux'

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
                </tr>
            </thead>
            <tbody>
                {Object.keys(this.props.fullDisplay ? this.props.totalClickEntries : this.props.currentClickEntries).map((key) => {
                    let entry = this.props.fullDisplay ? this.props.totalClickEntries[key] : this.props.currentClickEntries[key];
                    return(
                        <tr key={key}>
                            <td>
                                {entry.distance}
                            </td>
                            <td>
                                {entry.time}
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
    }
}

export default connect(mapStateToProps)(FittsDisplay)