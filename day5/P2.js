const path = require('path');
const fs = require('fs');

const getCoords = (stringInput) => {
    // 7,0 -> 6,4 becomes: x1 = 7, y1 = 0, x2 = 6, y2 = 4
    // returns [] if diagonal
    // returns array of coords as [[x, y], [x, y], etc...]
    let [c1, c2] = stringInput.split("->");
    let [x1, y1] = getxy(c1);
    let [x2, y2] = getxy(c2);
    coords = [];
    if (x1 === x2) {
        for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++){
            coords = [...coords, [x1, i]];
        }
    } else if (y1 === y2) {
        for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++){
            coords = [...coords, [i, y1]];
        }
    } else {
        // diagonal with a slope of 1 or -1
        slope = (y2-y1)/(x2-x1);
        /* tested a theory but there are no inputs with other slopes
        if ([1, -1].indexOf(slope) == -1) {
            console.log('found bad');
        }*/
        // always want smaller y first
        if (y2 < y1) {
            [x1, y1, x2, y2] = [x2, y2, x1, y1];
        }
        while (y1 <= y2) {
            coords = [...coords, [x1, y1]]
            x1 += slope;
            y1 += 1;
        }
    }
    return coords;
}

const getxy = (stringCoord) => {
    // returns int[] [x, y] from "x,y"
    return stringCoord.split(',').map(e=>parseInt(e))
}

const flattenLevel = (flattened, nested) => {
    // used by reduce to convert [[], [[1,2], [2,3]]] to [[1,2], [2,3]]
    return [...flattened, ...nested];
}

const getDataFromFile = (filename) => {
    return fs.readFileSync(
        path.join(__dirname, filename),
        'utf8'
    ).toString()
    .trim()
    .split('\n')
    .map(getCoords)
    .reduce(flattenLevel);
}
const testInput = getDataFromFile('testinput.txt');
const input = getDataFromFile('input.txt');

const getDupesCount = (allCoordinates) => {
    countObj = {};
    countDupes = 0;
    for (coord of allCoordinates) {
        if (!countObj[coord]) {
            countObj[coord] = 1;
        } else {
            if (countObj[coord] == 1) {
                countDupes++;
            }
            countObj[coord] += 1;
        }
    }
    return countDupes;
}

console.log("expected test data result: 12");
console.log("test data result: " + getDupesCount(testInput));
console.log("challenge input result: "+ getDupesCount(input));