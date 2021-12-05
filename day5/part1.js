const input = require('./inputP2');

countObj = {};
countDupes = 0;
for (coord of input.input) {
    if (!countObj[coord]) {
        countObj[coord] = 1;
    } else {
        if (countObj[coord] == 1) {
            countDupes++;
        }
        countObj[coord] += 1;
    }
}
console.log(countDupes);
//console.log(countObj);