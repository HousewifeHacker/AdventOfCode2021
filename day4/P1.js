const path = require('path');
const fs = require('fs');

const winningCombos = [
    [1,2,3,4,5],
    [6,7,8,9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],
    [5,10,15,20,25]
]
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
    for (let call of calls) {
        for (let board of boards) {
            let valIdx = board.findIndex((i) => i === call);
            if (valIdx != -1) {
                //it was found
                board[valIdx] = 'x';
                let hasWon = checkForWinner(board);
                if (hasWon) {
                    return scoreBoard(board)*call;
                }
            }
        }
    }
}

const checkForWinner = (board) => {
    for (combo of winningCombos) {
        winner = true;
        for (idx of combo) {
            if (board[idx-1] != 'x') {
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

const [calls, boards] = getDataFromFile('input.txt');
const score = markBoards(calls, boards);
console.log(score);

