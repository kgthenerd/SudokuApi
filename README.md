## Sudoku API

## Prerequisites

- npm 5.3.0 (`npm --version`)
- node 8.4.0 (`npm --version`)
- aws 1.11.136 for testing (`aws --version`)
- serverless 1.19.0

## Steps to set-up the environment:

- `npm install` to install all the Node.js dependencies listed in `package.json`

## Serverless Deployment
`sls deploy --aws-profile YOUR_AWS_PROFILE --verbose`

## API documentation
- `api-docs.yml` contains the API's documentation. Online version can be found [here](https://app.swaggerhub.com/apis/kgthenerd/sudoku-api/1.0.0)

## Demo
- A working version of API can be accessed here https://api.karthikg.xyz/v1/sudoku

## Reference
- Peter Norvig - [Solving Every Sudoku Puzzle](http://norvig.com/sudoku.html)
- Pankaj Kumar - [Sudoku Solving Program : Translating Python to JavaScript](http://pankaj-k.net/weblog/2007/03/sudoku_solving_program_transla.html)
- Sudoku Puzzle Generating: from Easy to Evil - http://zhangroup.aporc.org/images/files/Paper_3485.pdf
- Top 95 Hard Sudoku Puzzle - http://magictour.free.fr/top95