class MazePrototype {
    static COLORS = {
        cWhite: [240],
        cBlack: [0, 0, 0],
        cBlue: [0, 255, 255],
        cYellow: [255, 255, 0],
        cGandY: [200, 255, 0],
        cGrey: [161, 161, 161],
        cRed: [255, 0, 0]
    }

    constructor(canvasWidth, canvasHeight, cellWidth, cellHeight=cellWidth) {
        
        this.size = {
            width: canvasWidth,
            height: canvasHeight,
            w: cellWidth,
            h: cellHeight
        };

        this.rows = Math.floor(canvasWidth / cellWidth);
        if (this.rows % 2 == 0) this.rows--;
        
        this.cols = Math.floor(canvasHeight / cellHeight);
        if (cols % 2 == 0) cols--;

        // A* variables
        this.grid;
        this.initGrid(); // update grid

        for(let i = 0; i < this.rows; i++){ // Tell each spot their neighbors
            for(let j = 0; j < this.cols; j++){
                grid[i][j].addNeighbors(this.grid);
            }
        }

        //add start and end (they are not walls)
        this.start = this.grid[1][0];
        this.end = this.grid[this.rows - 2][this.cols - 1];
        this.start.wall = false;
        this.end.wall = false;

        strokeWeight(0);
        for (let i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                this.grid[i][j].show();
            }
        }

        this.openSet = [];
        //we start from the begining
        openSet.push(start);
        this.closedSet = [];
    }

    initGrid() {}

    // nextA_StarStep() {
    //     if(openSet.length > 0) { // if still searching
    //         //we can order them with "openSet.sort(spotComparison);"
    //         //but we search only for the best
    //         var indexBestSpot = 0;
    //         for(let i = 0; i < openSet.length; i++){
    //             if(openSet[i].f < openSet[indexBestSpot].f) { // if i better index
    //                 indexBestSpot = i;
    //             }
    //         }
    //         var current = openSet[indexBestSpot];
    //         if(current === end) { // if current is the end => finish
    //             console.log("Done!, there is a way!");
    //             for(let p = path.length - 1, q = 1; p > 0; p--, q++){
    //                 console.log(q + "º (" + path[p].i + ", " + path[p].j +")");
    //             }
    //             noLoop();
    //         }

    //         openSet.splice(indexBestSpot, 1);//remove the best from openSet
    //         closedSet.push(current);//add it to the closed

    //         var neighbors = current.neighbors;//get them from current
    //         for (var i = 0; i < neighbors.length; i++) {
    //             var neighbor = neighbors[i];

    //             // Valid next spot?
    //             if (!closedSet.includes(neighbor) && !neighbor.wall) {
    //                 var tempG = current.g + heuristics(neighbor, current);

    //                 // Is this a better path than before?
    //                 var newPath = false;
    //                 if (openSet.includes(neighbor)) {
    //                     if (tempG < neighbor.g) {
    //                         neighbor.g = tempG;
    //                         newPath = true;
    //                     }
    //                 } 
    //                 else {
    //                     neighbor.g = tempG;
    //                     newPath = true;
    //                     openSet.push(neighbor);
    //                     neighbor.show(cGandY);
    //                 }

    //                 // Yes, it's a better path
    //                 if (newPath) {
    //                     neighbor.h = heuristics(neighbor, end);
    //                     neighbor.f = neighbor.g + neighbor.h;
    //                     neighbor.previous = current;
    //                 }
    //             }
    //         }
    //     }
    //     else{//if no other way to go
    //         console.log("Ups, there is no way to go to the end");
    //         noLoop();
    //         return;
    //     }

    //     // Find the path by working backwards
    //     path = [];
    //     var temp = current;
    //     path.push(temp);
    //     while (temp.previous) {
    //         //console.log(temp.i + ", "+ temp.j);
    //         path.push(temp.previous);
    //         temp = temp.previous;
    //     }
    // }
}

class Maze extends MazePrototype {
    constructor(canvasWidth, canvasHeight, cellWidth, cellHeight=cellWidth) {
        super(canvasWidth, canvasHeight, cellWidth, cellHeight);
    }

    initGrid() {
        this.grid = primMaze(rows, cols);
    }
}

class RandomMaze extends MazePrototype {
    constructor(canvasWidth, canvasHeight, cellWidth, cellHeight=cellWidth) {
        super(canvasWidth, canvasHeight, cellWidth, cellHeight);
    }

    initGrid() {
        this.grid = new Array(this.rows);
        for(let i = 0; i < this.rows; i++) {
            grid[i] = new Array(this.cols);
            for(let j = 0; j < this.cols; j++){
                grid[i][j] = new Spot(i, j);
            }
        }
    }
}