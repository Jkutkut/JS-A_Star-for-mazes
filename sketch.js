var maze;
var w = 13;
var h = w;

var onLoop = true;
var aStarIterator;

function setup() {
    if (confirm('Would you like a maze?')) {
        maze = new Maze(windowWidth, windowHeight, w, h);
    } else {
        maze = new RandomMaze(windowWidth, windowHeight, w, h);
    }

    rows = Math.floor(windowWidth / w);
    if (rows % 2 == 0) rows--;
    cols = Math.floor(windowHeight / h);
    if (cols % 2 == 0) cols--;

    createCanvas(rows * w, cols * h);

    aStarIterator = maze.aStar();

    strokeWeight(0);
    for (let i = 0; i < maze.rows; i++) {
        for (let j = 0; j < maze.cols; j++) {
            maze.grid[i][j].show();
        }
    }
}

function draw() {
    for (var i = 0; i < maze.path.length; i++) {
        maze.path[i].show(Maze.COLORS.cGrey);
    }

    // maze.nextA_StarStep();
    aStarIterator.next();

    for (var i = 0; i < maze.path.length; i++) {
        maze.path[i].show(Maze.COLORS.cBlue);
    }
    maze.end.show(Maze.COLORS.cRed);
}

function keyPressed(event) {
    console.log(event);

    switch(event.key) {
        case " ":
            if (onLoop) noLoop();
            else loop();
            onLoop = !onLoop;
            break;
        case "ArrowRight":
            draw();
            break;
        case "f":
            while (!aStarIterator.next().done){}

            for (let p of maze.closedSet) {
                p.show(Maze.COLORS.cGrey);
            }
            draw();
    }
}