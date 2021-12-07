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
    //let sortedPositions = positionsArray.sort( (a,b) => a-b);
    //let mean = sortedPositions[Math.ceil(sortedPositions.length/2)];
    let mean = positionsArray.reduce( (total, pos) => {
        return total + parseInt(pos);
        }, 0) / positionsArray.length;
    // try the integers above and below the mean
    return Math.min(
        calcFuel(positionsArray, Math.floor(mean)),
        calcFuel(positionsArray, Math.ceil(mean)),
    )
}

let calcFuel = (positionsArray, goalPos) => {
    return positionsArray.reduce( (total, pos) => {
        // sum from i=1 to n : n(1+n) / 2
        let n = Math.abs(pos-goalPos);
        return total + n*(1+n)/2;
    }, 0);
}

let testResult = getTotal(getDataFromFile('testInput.txt'));
console.log("Expected result: 168, Actual: " + testResult);

let challengeResult = getTotal(getDataFromFile('input.txt'));
console.log(challengeResult);