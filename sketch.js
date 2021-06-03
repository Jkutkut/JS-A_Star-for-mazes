var maze;
var currentMazeType;
var w = 13;
var h = w;

var onLoop;
var aStarIterator;

function preload() {
    if (confirm('Would you like a maze?')) {
        currentMazeType = Maze;
    } else {
        currentMazeType = RandomMaze;
    }
}

function setup() {
    maze = new currentMazeType(windowWidth, windowHeight, w, h);

    onLoop = true

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

    aStarIterator.next();

    for (var i = 0; i < maze.path.length; i++) {
        maze.path[i].show(Maze.COLORS.cBlue);
    }
    maze.end.show(Maze.COLORS.cRed);
}

function keyPressed(event) {
    switch(event.key) {
        case " ": // Stop/Resume the current execution
            if (onLoop) noLoop();
            else loop();
            onLoop = !onLoop;
            break;
        case "ArrowRight": // Execute a sigle step
            draw();
            break;
        case "f": // Fast-foward to the end
            while (!aStarIterator.next().done){}

            for (let p of maze.closedSet) {
                p.show(Maze.COLORS.cGrey);
            }
            draw();
            break;
        case "s": // Change the size of the cells of the grid
            let sol = window.prompt("New size of each cell?", w);
            if (sol != null &&  // Check sol is a valid number. Source: stackoverflow.com/questions/175739
                !isNaN(sol) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                !isNaN(parseFloat(sol))) { // ...and ensure strings of whitespace fail)
                
                console.log("Changing the size of the cell to " + sol + "x" + sol + "px");
                w = sol;
                h = w;
            }
            else {
                console.warn("Value entered is not a valid number");
                break;
            }
            // Also do a reset
        case "r": // Reset with the current configuration
            setup();
            loop();
            break;
        case "t":
            preload();
            setup();
            loop();
            break;
    }
}