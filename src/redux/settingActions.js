import * as ActionTypes from "./ActionTypes";

export const incrementScore = () => {
    return {
        type : ActionTypes.INCREMENT_SCORE
    }
}

export const pickANewHighlight = (exception) => {
    return {
        type : ActionTypes.PICK_A_NEW_HIGHLIGHT,
        Exception : exception
    }
}

export const increaseFittsScore = (amount) => {
    return {
        type : ActionTypes.INCREASE_FITTS_SCORE,
        Amount : amount
    }
}

export const updatePrevXYCoord = (x, y) => {
    return {
        type : ActionTypes.UPDATE_PREV_X_Y_COORD,
        X : x,
        Y : y,
    }
}

export const setTime = (time) => {
    return {
        type : ActionTypes.SET_TIME,
        Time : time,
    }
}

export const endGame = () => {
    return {
        type : ActionTypes.END_GAME,
    }
}

export const resetGame = () => {
    return {
        type : ActionTypes.RESET_GAME
    }
}

export const setRegressionModel = (model) => {
    return {
        type : ActionTypes.SET_REGRESSION_MODEL,
        Model : model
    }
}

export const setChartData = (data) => {
    return {
        type : ActionTypes.SET_CHART_DATA,
        Data : data,
    }
}

export const setAvgIndexOfPerformance = (avg) => {
    return {
        type : ActionTypes.SET_AVERAGE_INDEX_OF_PERFORMANCE,
        Avg : avg
    }
}

export const setNumHighlights = (num) => {
    return {
        type : ActionTypes.SET_NUM_HIGHLIGHTS,
        Num : num
    }
}