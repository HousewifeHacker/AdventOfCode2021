const path = require('path');
const fs = require('fs');
const assert = require('assert');

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

const testData = getDataFromFile('testInput.txt')
assert(testData.length === 10);

const openingLookup = {
    "}": "{",
    "]": "[",
    ")": "(", 
    ">": "<"
}
const getInvalidChar = (chunk) => {
    charStack = [];
    for (let char of chunk) {
        switch (char) {
            case "{":
            case "[":
            case "(":
            case "<":
                charStack.push(char);
                break;
            case "}":
            case "]":
            case ")":
            case ">":
                let openingChar = charStack.pop();
                if (openingChar !== openingLookup[char]) {
                    return char;
                }
                break
            default:
                console.log("something wrong in switch" );
        }
    }
    return "";
}

assert(getInvalidChar(testData[2]) === "}");

const scoreLookup = {
    ")": 3,
    "]":57, 
    "}": 1197,
    ">": 25137
}

const tallyScore = (chunksArray) => {
    let score = 0;
    for (let chunk of chunksArray) {
        let invalidChar = getInvalidChar(chunk);
        if ( invalidChar !== "") {
            score += scoreLookup[invalidChar];
        }
    }
    return score;
}

assert(tallyScore(testData) === 26397);
console.log("challenge result: " + tallyScore(getDataFromFile("input.txt")));