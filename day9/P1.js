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
    
const isLessThanAdjacents = (data, x, y) => {
    let adjacents = [];
    try {
        adjacents.push(parseInt(data[x-1][y]));
    } catch {
        console.log("edge found for x direction");
    }
    try {
        adjacents.push(parseInt(data[x+1][y]));
    } catch {
        console.log("edge found for x direction");
    }
    // y direction is a string so indexing out of bounds wont throw an error
    let y_right = parseInt(data[x][y+1]);
    let y_left = parseInt(data[x][y-1]);
    if (!isNaN(y_left)) {
        adjacents.push(y_left);
    }
    if (!isNaN(y_right)) {
        adjacents.push(y_right);
    }
    return parseInt(data[x][y]) < Math.min(...adjacents);

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