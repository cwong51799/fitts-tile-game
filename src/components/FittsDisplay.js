import React, { Component } from 'react'
import { Table } from 'react-materialize'
import { connect } from 'react-redux'

class FittsDisplay extends Component {
    render() {
        return (
            <Table className="fitts-table">
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
                {Object.keys(this.props.entries).map((key) => {
                    let entry = this.props.entries[key];
                    return(
                        <tr>
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
        entries : state.clickEntries
    }
}

export default connect(mapStateToProps)(FittsDisplay)