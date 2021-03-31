import React, { Component } from 'react'
import { connect } from 'react-redux'

class Scoreboard extends Component {
    render() {
        return (
            <div>
                Score: {this.props.score}
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        score : state.score
    }
}

export default connect(mapStateToProps)(Scoreboard)