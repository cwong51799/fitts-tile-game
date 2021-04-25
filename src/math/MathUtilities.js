import SimpleLinearRegression from 'ml-regression-simple-linear'

const widthOfTarget = 100;

/* Sometimes ID can be negative, count these as 0 */
export function getIndexOfDifficulty(clickEntry) {
    var id = Math.log((2*clickEntry.distance)/widthOfTarget).toFixed(4)
    if (id < 0) {
        id = 0;
    }
    return id;
}

function getIndexOfPerformance(clickEntry) {
    let id = getIndexOfDifficulty(clickEntry)
    /* Convert the movement time into seconds for this calculation */
    return (id / (clickEntry.time * .001))
}

export function getAverageIndexOfPerformance(clickEntries) {
    var sum = 0;
    for (var i=0;i<clickEntries.length;i++) {
        sum+=getIndexOfPerformance(clickEntries[i])
    }
    return (sum/clickEntries.length).toFixed(2)
}

export function calculateMeanMovementPerId(clickEntries) {
    var idMeanDict = {}
    var countDict = {}

    for (var i=0;i<clickEntries.length;i++) {
        var clickEntry = clickEntries[i]
        var idOfEntry = getIndexOfDifficulty(clickEntry)
        if (idOfEntry in idMeanDict) {
            idMeanDict[idOfEntry] += clickEntry.time
            countDict[idOfEntry] += 1
        } else {
            idMeanDict[idOfEntry] = clickEntry.time
            countDict[idOfEntry] = 1
        }
    }
    Object.entries(idMeanDict).forEach(([key, value]) => {
        idMeanDict[key] = Math.round(value / countDict[key])
    });
    return idMeanDict
}

export function getChartReadyData(clickEntries) {
    var idMeanDict = calculateMeanMovementPerId(clickEntries)
    var regression = calculateLinearRegression(clickEntries)
    var data = []
    var keys = Object.keys(idMeanDict)
    data.push(["Index of Difficulty", "Movement Time", "Predicted Value"])
    for (var i=0;i<keys.length;i++) {
        data.push([parseFloat(keys[i]), idMeanDict[keys[i]], regression.predict(parseFloat(keys[i]))])
    }
    return data;
}

export function getArrayFormOfMeanMovementPerId(clickEntries) {
    var idMeanDict = calculateMeanMovementPerId(clickEntries)
    var data = []
    var keys = Object.keys(idMeanDict)
    data.push(["Index of Difficulty", "Movement Time"])
    for (var i=0;i<keys.length;i++) {
        data.push([parseFloat(keys[i]), idMeanDict[keys[i]]])
    }
    return data;
}

export function calculateLinearRegression(clickEntries) {
    var idMeanDict = calculateMeanMovementPerId(clickEntries)
    var x = []
    var y = []
    var keys = Object.keys(idMeanDict)
    for (var i=0;i<keys.length;i++) {
        x.push(parseFloat(keys[i]))
        y.push(idMeanDict[keys[i]])
    }
    return new SimpleLinearRegression(x, y)
}