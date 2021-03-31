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
        return (
            <div className="board">
                <Row>
                <Col><Tile id={1}/></Col>
                <Col><Tile id={2}/></Col>
                <Col><Tile id={3}/></Col>
                <Col><Tile id={4}/></Col>
                </Row>
                <Row>
                <Col><Tile id={5}/></Col>
                <Col><Tile id={6}/></Col>
                <Col><Tile id={7}/></Col>
                <Col><Tile id={8}/></Col>
                </Row>
                <Row>
                <Col><Tile id={9}/></Col>
                <Col><Tile id={10}/></Col>
                <Col><Tile id={11}/></Col>
                <Col><Tile id={12}/></Col>
                </Row>
                <Row>
                <Col><Tile id={13}/></Col>
                <Col><Tile id={14}/></Col>
                <Col><Tile id={15}/></Col>
                <Col><Tile id={16}/></Col>
                </Row>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetGame : () => {
            dispatch(resetGame())
        }
    }
}
const mapStateToProps = (state, ownProps) => {
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
