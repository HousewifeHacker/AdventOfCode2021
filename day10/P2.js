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
const closingLookup = {
    "{": "}",
    "[": "]",
    "(": ")", 
    "<": ">"
}
const getMissingChars = (chunk) => {
    charStack = [];
    let missingChars = [];
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
                    return missingChars;
                }
                break
            default:
                console.log("something wrong in switch" );
        }
    }
    // left with a stack of opening characters
    for (let i = charStack.length-1; i>=0; i--) {
        missingChars.push(closingLookup[charStack[i]]);
    }
    return missingChars;
}

// Complete by adding }}]])})]
assert(getMissingChars(testData[0]).length === 8);

const scoreLookup = {
    ")": 1,
    "]": 2, 
    "}": 3,
    ">": 4
}

const tallyScore = (chunk) => {
    //Start with a total score of 0. 
    // Then, for each character, multiply the total score by 5
    // then increase the total score by the point value given in scoreLookup
    let score = 0;
    let missingChars = getMissingChars(chunk);
    for (let missingChar of missingChars) {
        score *= 5;
        score += scoreLookup[missingChar];
    }
    return score;
}

// }}]])})] - 288957 total points
assert(tallyScore(testData[0]) === 288957);

const getMiddleScore = (chunksArr) => {
    let scores = [];
    for (let chunk of chunksArr) {
        let score = tallyScore(chunk);
        score > 0 && scores.push(score);
    }
    scores.sort( (a, b) => {return a-b});
    //There will always be an odd number of scores to consider
    return scores[(scores.length-1)/2];
}

assert(getMiddleScore(testData)===288957);
console.log("challenge result: " + getMiddleScore(getDataFromFile("input.txt")));
