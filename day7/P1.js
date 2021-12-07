const path = require('path');
const fs = require('fs');

const getDataFromFile = (filename) => {
    return fs.readFileSync(
        path.join(__dirname, filename),
        'utf8'
    ).toString()
    .trim()
    .split(',');
}

const getTotal = (positionsArray) => {
    let sortedPositions = positionsArray.sort( (a,b) => a-b);
    let median = sortedPositions[Math.ceil(sortedPositions.length/2)];
    let distance = sortedPositions.reduce( (total, pos) => {
        return total + Math.abs(pos-median);
    }, 0);
    return distance;
}

let testResult = getTotal(getDataFromFile('testInput.txt'));
console.log("Expected result: 37, Actual: " + testResult);

let challengeResult = getTotal(getDataFromFile('input.txt'));
console.log(challengeResult);