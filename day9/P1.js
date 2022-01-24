const path = require('path');
const fs = require('fs');

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

const getTotal = (data) => {
    let total = 0;
    for (let x=0; x < data.length; x++) {
        for (let y=0; y < data[0].length; y++) {
            if (isLessThanAdjacents(data, x, y)) {
                total += parseInt(data[x][y]) + 1;
            }
        }
    }
    return total;
}

let testResult = getTotal(getDataFromFile('testInput.txt'));
console.log("expected result: 15; actual: " + testResult);

let challengeResult = getTotal(getDataFromFile('input.txt'));
console.log("challenge result: " + challengeResult);