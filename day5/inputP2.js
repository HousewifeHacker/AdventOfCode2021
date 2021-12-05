const path = require('path');
const fs = require('fs');

const getCoords = (stringInput) => {
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
    return stringCoord.split(',').map(e=>parseInt(e))
}

const flattenLevel = (flattened, nested) => {
    return [...flattened, ...nested];
}

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n')
    .map(getCoords)
    .reduce(flattenLevel);

module.exports = {
	input: input
};