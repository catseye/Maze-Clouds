var MAZE_WIDTH = 32;
var MAZE_HEIGHT = 32;

function makeDirs() {
    var dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    var newDirs = [];
    while (dirs.length > 0) {
        newDirs.push(dirs.splice(Math.random() * dirs.length, 1)[0]);
    }
    return newDirs;
}

function iterativelyDigMaze(pf, x, y, n) {
    var stack = [];
    var dirs = makeDirs();
    stack.push( [x, y, n, dirs] );

    while (stack.length > 0) {
        var r = stack.pop(); x = r[0]; y = r[1]; n = r[2]; dirs = r[3];
        pf[y][x] = n;
        if (dirs.length > 0) {
            r = dirs.pop(); var dx = r[0]; var dy = r[1];
            stack.push( [x, y, n, dirs] );
            var nx = x + dx;
            var ny = y + dy;
            if (ny < 0 || ny >= MAZE_HEIGHT || nx < 0 || nx >= MAZE_WIDTH || pf[ny][nx] != 0)
                continue;
            stack.push( [nx, ny, n+1, makeDirs()] );
        } else {
            pf[y][x] = n;
            // leave it popped, and continue
        }
    }
}

function makeMaze() {
    var pf = new Array(MAZE_HEIGHT);
    for (var i = 0; i < MAZE_HEIGHT; i++) {
        pf[i] = new Array(MAZE_WIDTH);
        for (var j = 0; j < MAZE_WIDTH; j++) {
            pf[i][j] = 0;
        }
    }

    iterativelyDigMaze(pf, MAZE_WIDTH / 2, MAZE_HEIGHT / 2, 1);

    var maxValue = 0;
    for (var y = 0; y < MAZE_HEIGHT; y++) {
        for (var x = 0; x < MAZE_WIDTH; x++) {
            var cell = pf[y][x];
            if (cell > maxValue) maxValue = cell;
        }
    }

    return {
        pf: pf,
        maxValue: maxValue
    };
}

function drawMaze(maze, drawCell) {
    for (var y = 0; y < MAZE_HEIGHT; y++) {
        for (var x = 0; x < MAZE_WIDTH; x++) {
            var cell = maze.pf[y][x];
            drawCell(x, y, cell);
        }
    }
}
