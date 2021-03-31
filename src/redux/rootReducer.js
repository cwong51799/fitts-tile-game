import * as ActionTypes from './ActionTypes'
import ClickEntry from './ClickEntry'
/* Initial State */
const initState = {
  score : 0,

  prevX : -1,

  prevY : -1,

  prevTimeStamp : -1,

  fittsScore : 0,

  clickEntries : [],

  highlightedTiles : []
}

const pickANewTile = (X, highlightedTiles) => {
  var randomNumber = Math.floor(Math.random() * 16) + 1
  while (randomNumber === X || highlightedTiles.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * 16) + 1
  }
  return randomNumber
}


const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT_SCORE:
      return {
        ...state,
        score : state.score + 1
      }
    case ActionTypes.PICK_A_NEW_HIGHLIGHT:
      var newHighlights = [...state.highlightedTiles.slice(0, state.highlightedTiles.indexOf(action.Exception)),
        ...state.highlightedTiles.slice(state.highlightedTiles.indexOf(action.Exception)+1)]
      return {
        ...state,
        highlightedTiles : [...newHighlights, pickANewTile(action.Exception, newHighlights)]
      }
    case ActionTypes.INCREASE_FITTS_SCORE:
      return {
        ...state,
        fittsScore : state.fittsScore + action.Amount
      }
    case ActionTypes.UPDATE_PREV_X_Y_COORD:
      /**  Need conditional in event of first click */
      var currentTime = Date.now()
      if (state.prevTimeStamp !== -1) {
        var timeDiff = currentTime - state.prevTimeStamp
        var a = action.X - state.prevX
        var b = action.Y - state.prevY
        var distance = Math.sqrt(a*a, b*b)
        return {
          ...state,
          prevTimeStamp : currentTime,
          clickEntries : [...state.clickEntries, new ClickEntry(distance, timeDiff)],
          prevX : action.X,
          prevY : action.Y,
        }
      } else {
        return {
          ...state,
          prevTimeStamp : currentTime,
          prevX : action.X,
          prevY : action.Y,
        }
      }
    case ActionTypes.RESET_GAME:
      return {
        ...initState,
        highlightedTiles : [pickANewTile(-1, state.highlightedTiles), pickANewTile(-1, state.highlightedTiles), pickANewTile(-1, state.highlightedTiles)]
      }
    default:
      return state;
  };
}

export default rootReducer;
