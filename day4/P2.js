const path = require('path');
const fs = require('fs');

const winningCombos = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],
    [0,5,10,15,20],
    [1,6,11,16,21], 
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24]
];
const getDataFromFile = (filename) => {
    // on Windows machine, \r
    let allData = fs.readFileSync(
        path.join(__dirname, filename),
        'utf8'
    ).toString()
    .trim()
    .split("\r\n");
    let calls = allData[0].split(',').map(i => parseInt(i));
    let boards = [];
    let i = 2;
    let currentBoard = [];
    for (;i < allData.length; i++) {
        // add five rows of five ints to an array
        if (allData[i] == '') {
            boards = [...boards, currentBoard];
            currentBoard = [];
        } else {
            let thisRowParsed = [];
            let thisRow = allData[i].split(' ');
            for (val of thisRow) {
                if (val!='') { 
                    thisRowParsed = [...thisRowParsed, parseInt(val)];
                }
            }
            currentBoard = [...currentBoard, ...thisRowParsed];
        }
    }
    if (currentBoard.length > 0) {
        boards = [...boards, currentBoard];
    }
    return [calls, boards];
}
const markBoards = (calls, boards) => {
    let score;
    let winners = [];
    for (let call of calls) {
        for (let bi = 0; bi< boards.length; bi++) {
            if (winners.findIndex( (w) => w === bi) > -1) { 
                continue;
            }

            let valIdx = boards[bi].findIndex((i) => i === call);
            if (valIdx != -1) {
                //it was found
                boards[bi][valIdx] = 'x';
                let hasWon = checkForWinner(boards[bi]);
                if (hasWon) {
                    score = scoreBoard(boards[bi])*call;
                    winners = [...winners, bi];
                    if (winners.length === boards.length) {
                        return score;
                    }
                }
            }
        }
    }
}

const checkForWinner = (board) => {
    for (combo of winningCombos) {
        winner = true;
        for (idx of combo) {
            if (board[idx] != 'x') {
                winner=false;
            }
        }
        if (winner) {
            return true;
        }
    }
    return false;
}

const scoreBoard = (board) => {
    let initialValue = 0;
    return board.reduce( (sum, tileValue) => {
        if (tileValue != 'x') {
            return sum + tileValue;
        }
        return sum;
    }, initialValue);
}

const [testCalls, testBoards] = getDataFromFile('testInput.txt');
const testScore = markBoards(testCalls, testBoards);
console.log("testInput expected: 1924, actual: "+ testScore);


const [calls, boards] = getDataFromFile('input.txt');
const score = markBoards(calls, boards);
console.log("Challenge result: " + score);