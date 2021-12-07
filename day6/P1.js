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

const buildStatesMap = (initialStateArray) => {
    let statesMap = new Map();
    for (let i =0; i<9; i++) {
        statesMap.set(i, 0);
    }
    for (state of initialStateArray) {
        let parsed = parseInt(state);
        statesMap.set(parsed, statesMap.get(parsed)+1);
    }
    return statesMap;
}

const getTotal = (statesMap) => {
    let total = 0;
    for (let i =0; i<9; i++) {
        total += statesMap.get(i);
    }
    return total;
}

const addXDays = (initialStateArray, dayCount) => {
    let statesMap = buildStatesMap(initialStateArray);
    
    for (let i = 0; i < dayCount; i++) {
        statesMap = addDay(statesMap);
    }
    return getTotal(statesMap);
} 

const addDay = (statesMap) => {
    let countBabies = statesMap.get(0);
    let newMap = new Map();
    for (let k = 8; k > 0; k--) {
        newMap.set(k-1, statesMap.get(k));
    }
    newMap.set(8, countBabies);
    newMap.set(6, newMap.get(6) + countBabies);
    return newMap;
}

let testData = getDataFromFile('testInput.txt');
console.log("Expected test result: 5934, Actual: "+ addXDays(testData, 80));

let data = getDataFromFile('input.txt');
console.log("Challenge result: " + addXDays(data, 256));