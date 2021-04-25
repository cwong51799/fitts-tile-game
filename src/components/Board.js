import React, { Component } from 'react'
import Tile from './Tile'
import {Row, Col} from 'react-materialize'
import { connect } from 'react-redux'
import { resetGame } from '../redux/settingActions'

class Board extends Component {
    componentDidMount() {
        this.props.resetGame()
    }

    render() {
        var i = 1;
        return (
            <div className="board">
                <Row>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                </Row>
                <Row>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                </Row>
                <Row>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                </Row>
                <Row>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                    <Col><Tile id={i++}/></Col>
                </Row>
               
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetGame : () => {
            dispatch(resetGame())
        },
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        board : state.Board
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
