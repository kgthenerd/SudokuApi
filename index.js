const Sudoku = require('./sudoku.js');
const AWS = require('aws-sdk');

const sudoku = new Sudoku();
const db = new AWS.DynamoDB.DocumentClient();

module.exports.solveSudokuPuzzle = (event, context, callback) => {
    var puzzle = event.body;
    console.log(puzzle);
    if(puzzle.length < 81) {
        return callback(null, {
            statusCode: 422,
            body: JSON.stringify({
                errCode: '422 - Unable to process the request',
                errMsg: 'Not gonna happen, make sure puzzle is least 81 char long'
            })
        });
    } else {
        var solution = sudoku.solve(puzzle);
        if(solution) {
            return callback(null, {
                statusCode: 200,
                body:JSON.stringify({result: solution})
            });
        } else {
            return callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                    errCode: '500 - Borked codebase fix it',
                    errMsg: 'Houston, we have a problem'
                })
            });
        }
    }
};

module.exports.showSudokuPuzzles = (event, context, callback) => {
    var id = Math.floor(Math.random() * 20) + 1;
    var result = null;
    var searchParams = {
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression : 'id = :id',
        ExpressionAttributeValues : {
            ':id' : id
        }
    }
    const dbQuery = (err, data) => {
        if(err) {
            console.log("Failed to fetch data: " + JSON.stringify(err, null, 2));
            return false;
        } else {
            if(data.Items.length > 0) {
                result = data.Items[0].puzzle;
                console.log("It worked: " + result);
                return callback(null, {
                    statusCode: 200,
                    body:JSON.stringify({
                        puzzle: result
                    })
                });
            } else {
                console.log("No data exist on database");
                return false;
            }
        }
    }
    db.query(searchParams, dbQuery);
};