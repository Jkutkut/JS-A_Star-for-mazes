function primMaze(r, c) {
    // Create the maze matrix
    let maze = []; // Start with a grid full of walls.
    for (let i = 0; i < r; i++) {
        maze.push([]);
        for (let j = 0; j < c; j++) {
            maze[i].push(new Spot(i, j, true));
        }
    }

    let partOfMaze = new Set(); // Pieces already being path of the maze
    maze[1][1].wall = false; // Pick a cell, 
    partOfMaze.add(maze[1][1]); // mark it as part of the maze

    let walls = new Set(); // Add the walls of the cell to the wall list.
    walls.add(maze[1][2]);
    walls.add(maze[2][1]);

    /**
     * @param {set} set 
     * @returns A random element from the set
     */
    let getRandomItem = function(set) {
        let items = Array.from(set);
        return items[Math.floor(Math.random() * items.length)];
    }

    /**
     * @param {Spot} c1 - Spot
     * @param {Spot} c2 - Spot
     * @param {set} s - Set to check
     * @returns Whenever one (and only one) of the spots are inside the set
     */
    let xor = function(c1, c2, s) {
        let cmp1 = s.has(c1);
        let cmp2 = s.has(c2);
        if (cmp1 && !cmp2) {
            return c2;
        }
        else if (!cmp1 && cmp2) {
            return c1;
        }
        return false;
    }
    
    /**
     * @param {number} r - Current row position
     * @param {number} c - Current col position
     * @param {number} rMax - Amount of rows
     * @param {number} cMax - Amount of cols
     * @returns Whenever the position is valid (inBounds)
     */
    let inBounds = function(r, c, rMax, cMax) {
        return r > 0 && c > 0 && r < rMax - 1 && c < cMax - 1;
    }

    while (walls.size > 0) {
        let w = getRandomItem(walls);

        let notVisitedCell; // cells that the wall divides
        if (w.i % 2 == 0) { // Horizontal wall
            notVisitedCell = xor(maze[w.i - 1][w.j], maze[w.i + 1][w.j], partOfMaze);
        }
        else { // Vertical wall
            notVisitedCell = xor(maze[w.i][w.j - 1], maze[w.i][w.j + 1], partOfMaze);
        }
        
        if (notVisitedCell) { // If only one of the two cells that the wall divides is visited
            w.wall = false; // Make the wall a passage
            // mark the unvisited cell as part of the maze.
            partOfMaze.add(notVisitedCell);
            notVisitedCell.wall = false;

            for (let i = -1; i <= 1; i += 2) { // Add the neighboring walls of the cell to the wall list
                if (inBounds(notVisitedCell.i + i, notVisitedCell.j, r, c)) {
                    walls.add(maze[notVisitedCell.i + i][notVisitedCell.j]);
                }
                if (inBounds(notVisitedCell.i, notVisitedCell.j + i, r, c)) {
                    walls.add(maze[notVisitedCell.i][notVisitedCell.j + i]);
                }
            }
        }

        walls.delete(w); // Remove the wall from the list
    }

    
    // Open a few cell to have a start and an end
    for (let i = r - 2, j = c - 1; maze[i][j].wall; j--) {
        maze[i][j].wall = false;
    }
    maze[1][0].wall = false;
    return maze;
}


function printM(matrix){
    let str = "  *  ";
    for(let i = 0; i < matrix.length; i++){
        str += " " + i + ((i > 9) ? "" : " ") + " ";
    }
    str += " \n";
    for(let j = 0; j < matrix[0].length; j++){
        str += "    +";
        for (let i = 0; i < matrix.length; i++) {
            str += "---+";
        }
        str += " \n";

        str += " " + ((j > 9) ? "" : " ") + j + " |";
        for(let i = 0; i < matrix.length; i++){
            let value = (matrix[i][j].wall) ? "8" : " ";
            str += " " + value + " |";
        }
        str += " \n";
    }
    console.log(str);
}