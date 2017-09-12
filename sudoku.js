// Based on Peter Norvig's -  Solving Every Sudoku Puzzle
// http://norvig.com/sudoku.html
// Javascript Translation by Pankaj Kumar
// Rest of the things are mine

const Sudoku = function () { };
const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const cols = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const digits = "123456789";
var squares = cross(rows, cols);
var nAssigns = 0;
var nEliminations = 0;
var nSearches = 0;
var unitList = [];

function cross(A, B) {
    var C = [];
    for (var a in A)
        for (var b in B)
            C.push(A[a] + B[b]);
    return C;
}

function member(item, list) {
    for (var i in list)
        if (item == list[i]) return true;
    return false;
}

for (var c in cols)
    unitList.push(cross(rows, [cols[c]]));
for (var r in rows)
    unitList.push(cross([rows[r]], cols));
var rRows = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I']];
var cCols = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']];
for (var rs in rRows)
    for (var cs in cCols)
        unitList.push(cross(rRows[rs], cCols[cs]));

var units = {};
for (var s in squares) {
    units[squares[s]] = [];
    for (var u in unitList)
        if (member(squares[s], unitList[u]))
            units[squares[s]].push(unitList[u]);
}

var peers = {};
for (var s in squares) {
    peers[squares[s]] = {};
    for (var u in units[squares[s]]) {
        var ul = units[squares[s]][u];
        for (var s2 in ul)
            if (ul[s2] != squares[s])
                peers[squares[s]][ul[s2]] = true;
    }
}

function parseGrid(grid) {
    nAssigns = 0;
    nEliminations = 0;
    nSearches = 0;
    var grid2 = "";
    for (var c = 0; c < grid.length; c++)
        if ("0.-123456789".indexOf(grid.charAt(c)) >= 0)
            grid2 += grid.charAt(c);
    var values = {};
    for (var s in squares)
        values[squares[s]] = digits;
    for (var s in squares)
        if (digits.indexOf(grid2.charAt(s)) >= 0 && !assign(values, squares[s], grid2.charAt(s)))
            return false;
    return values;
}

function assign(values, sq, dig) {
    ++nAssigns;
    var result = true;
    var val = values[sq];
    for (var d = 0; d < val.length; d++)
        if (val.charAt(d) != dig)
            result &= (eliminate(values, sq, val.charAt(d)) ? true : false);
    return (result ? values : false);
}

function eliminate(values, sq, dig) {
    ++nEliminations;
    if (values[sq].indexOf(dig) == -1)
        return values;
    values[sq] = values[sq].replace(dig, "");
    if (values[sq].length == 0)
        return false;
    else if (values[sq].length == 1) {
        var result = true;
        for (var s in peers[sq])
            result &= (eliminate(values, s, values[sq]) ? true : false);
        if (!result) return false;
    }
    for (var u in units[sq]) {
        var dPlaces = [];
        for (var s in units[sq][u]) {
            var sq2 = units[sq][u][s];
            if (values[sq2].indexOf(dig) != -1)
                dPlaces.push(sq2);
        }
        if (dPlaces.length == 0)
            return false;
        else if (dPlaces.length == 1)
            if (!assign(values, dPlaces[0], dig))
                return false;
    }
    return values;
}

function dup(obj) {
    var d = {};
    for (var f in obj)
        d[f] = obj[f];
    return d;
}

function search(values) {
    ++nSearches;
    if (!values)
        return false;
    var min = 10, max = 1, sq = null;
    for (var s in squares) {
        if (values[squares[s]].length > max)
            max = values[squares[s]].length;
        if (values[squares[s]].length > 1 && values[squares[s]].length < min) {
            min = values[squares[s]].length;
            sq = squares[s];
        }
    }

    if (max == 1)
        return values;
    for (var d = 0; d < values[sq].length; d++) {
        var res = search(assign(dup(values), sq, values[sq].charAt(d)));
        if (res)
            return res;
    }
    return false;
}

function center(s, w) {
    var excess = w - s.length;
    while (excess > 0) {
        if (excess % 2) s += " "; else s = " " + s;
        excess -= 1;
    }
    return s;
}

Sudoku.prototype.solve = function solve(data) {
    var solution = search(parseGrid(data));
    if (!solution) {
        return false;
    }
    return solution;
};

module.exports = Sudoku;