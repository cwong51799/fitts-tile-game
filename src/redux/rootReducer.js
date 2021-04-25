import * as ActionTypes from './ActionTypes'
import ClickEntry from '../classes/ClickEntry'
import PremadeEntries from '../data/PremadeEntries.json'

const timeIncrement = 10
const clicksBeforeIncrement = 10
const numTiles = 40

/* Initial State */
const initState = {
  score : 0,

  prevX : -1,

  prevY : -1,

  prevTimeStamp : -1,

  fittsScore : 0,

  totalClickEntries : [],

  currentClickEntries : [],

  highlightedTiles : [],

  AvgIP : 0,

  time : timeIncrement,

  RegressionModel : null,

  NumHighlights : 1,

  ChartData : [],

  GameOver : false,

  Borders : true,
}

const pickANewTile = (X, highlightedTiles) => {
  var randomNumber = Math.floor(Math.random() * numTiles) + 1
  while (randomNumber === X || highlightedTiles.includes(randomNumber)) {
    randomNumber = Math.floor(Math.random() * numTiles) + 1
  }
  return randomNumber
}


const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.INCREMENT_SCORE:
      if (state.score === 0) {
        return {
          ...state,
          score : state.score + 1,
          currentClickEntries : []
        }
      }
      else if ((state.score + 1) % clicksBeforeIncrement === 0) {
        return {
          ...state,
          score : state.score + 1,
          time : state.time + timeIncrement,
        }
      } else {
        return {
          ...state,
          score : state.score + 1,
        }
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
          currentClickEntries : [...state.currentClickEntries, new ClickEntry(distance, timeDiff)],
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
    case ActionTypes.SET_AVERAGE_INDEX_OF_PERFORMANCE:
      return {
        ...state,
        AvgIP : action.Avg
      }
    case ActionTypes.SET_TIME:
      return {
        ...state,
        time : action.Time
      }
    case ActionTypes.END_GAME:
      return {
        ...state,
        GameOver : true,
        totalClickEntries : [...state.totalClickEntries, ...state.currentClickEntries]
      }
    case ActionTypes.RESET_GAME:
      var newHighlightedTiles = [];
      for (var i=0;i<state.NumHighlights;i++) {
        newHighlightedTiles.push(pickANewTile(-1, state.highlightedTiles))
      }
      return {
        ...initState,
        highlightedTiles : newHighlightedTiles,
        totalClickEntries : state.totalClickEntries,
          /* Preserve the regression model */
        RegressionModel : state.RegressionModel,

      }
    case ActionTypes.SET_REGRESSION_MODEL:
      return {
        ...state,
        RegressionModel : action.Model
      }
    case ActionTypes.SET_CHART_DATA:
      return {
        ...state,
        ChartData : action.Data
      }
    case ActionTypes.SET_NUM_HIGHLIGHTS:
      return {
        ...state,
        NumHighlights : action.Num
      }
    case ActionTypes.LOAD_IN_PREMADE_ENTRIES:
      var newEntries = []
      for (var j=0; j<PremadeEntries.entries.length;j++) {
        newEntries.push(new ClickEntry(PremadeEntries.entries[j].distance, PremadeEntries.entries[j].time))
      }
      return {
        ...state,
        totalClickEntries : [...newEntries, ...state.totalClickEntries]
      }
    case ActionTypes.TOGGLE_BORDERS:
      return {
        ...state,
        Borders : action.Status,
      }
    default:
      return state;
  };
}

export default rootReducer;
