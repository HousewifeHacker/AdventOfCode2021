const path = require('path');
const fs = require('fs');
const { assert } = require('console');

const getDataFromFile = (filename) => {
    // on Windows machine, \r
    let allData = fs.readFileSync(
        path.join(__dirname, filename),
        'utf8'
    ).toString()
    .trim()
    .split("\r\n");
    return allData;
}

const getAdjacentCoords = (maxX, maxY, x, y) => {
    let adjacentCoords = [];
    if (x > 0 ) {
        adjacentCoords.push([x-1, y]);
    }
    if (y > 0) {
        adjacentCoords.push([x, y-1]);
    }
    if (x < maxX) {
        adjacentCoords.push([x+1, y])
    }
    if (y < maxY) {
        adjacentCoords.push([x, y+1])
    }
    return adjacentCoords;

}
    
const isLessThanAdjacents = (data, x, y) => {
    let adjacentVals = [];
    let adjacentCoords = getAdjacentCoords(data.length-1, data[0].length-1, x, y);
    for (coord of adjacentCoords) {
        adjacentVals.push(parseInt(data[coord[0]][coord[1]]));
    }
    return parseInt(data[x][y]) < Math.min(...adjacentVals);

}

const getLowPoints = (data) => {
    let lows = [];
    for (let x=0; x < data.length; x++) {
        for (let y=0; y < data[0].length; y++) {
            if (isLessThanAdjacents(data, x, y)) {
                lows.push([x, y]);
            }
        }
    }
    return lows;
}

const getBasin = (data, coord) => {
    const isNew = (testCoord) => {
        let seenIdx = seenCoords.findIndex(el=> el[0] == testCoord[0] && el[1] == testCoord[1]);
        return seenIdx===-1;
    }
    const basinCoords = [];
    const seenCoords = [coord];
    const toCheck = [coord];
    while (toCheck.length > 0) {
        let nextCoord = toCheck.pop();
        let adjacentCoords = getAdjacentCoords(data.length-1, data[0].length-1, nextCoord[0], nextCoord[1]);
        for (let adjCoord of adjacentCoords) {
            if (isNew(adjCoord)) {
                if (data[adjCoord[0]][adjCoord[1]]!='9') {
                    toCheck.push(adjCoord);
                }
                seenCoords.push(adjCoord);
            }
        }
        if (data[nextCoord[0]][nextCoord[1]]!='9') {
            basinCoords.push(nextCoord);
        }        
    }
    return basinCoords;
}

const getTopBasins = (data) => {
    let basins = [];
    let lowPoints = getLowPoints(data);
    for (let lowPoint of lowPoints) {
        basins.push(getBasin(data, lowPoint));
    }
    //basins.push(getBasin(data, lowPoints[1]));
    basins = basins.sort((a, b) => {return b.length - a.length});
    //return basins;
    return basins[0].length*basins[1].length*basins[2].length;
}

let testResult = getTopBasins(getDataFromFile('testInput.txt'));
console.log( "expected: 1134; actual: " +testResult);

let challengeResult = getTopBasins(getDataFromFile('input.txt'));
console.log("challenge result: " + challengeResult);