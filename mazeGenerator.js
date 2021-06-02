function primMaze(r, c) {
    let maze = []; // Start with a grid full of walls.
    for (let i = 0; i < r; i++) {
        maze.push([]);
        for (let j = 0; j < c; j++) {
            maze[i].push(new spot(i, j, true));
        }
    }

    maze[1][0] = false;
    let partOfMaze = new Set();
    maze[1][1].wall = false; // Pick a cell, 
    partOfMaze.add(maze[1][1]); // mark it as part of the maze

    let walls = new Set(); // Add the walls of the cell to the wall list.
    walls.add(maze[1][2]);
    walls.add(maze[2][1]);

    let iterations = 0;
    let getRandomItem = function(set) {
        let items = Array.from(set);
        return items[Math.floor(Math.random() * items.length)];
    }
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
    let inBounds = function(r, c, rMax, cMax) {
        return r > 0 && c > 0 && r < rMax - 1 && c < cMax - 1;
    }
    while (walls.size > 0 && iterations++ < 1000) {
        let w = getRandomItem(walls);
        let cell1, cell2; //  cells that the wall divides
        if (w.i % 2 == 0) { // Horizontal wall
            cell1 = maze[w.i - 1][w.j];
            cell2 = maze[w.i + 1][w.j];
        }
        else if (w.j % 2 == 0) { // Vertical wall
            cell1 = maze[w.i][w.j - 1];
            cell2 = maze[w.i][w.j + 1];
        }

        let notVisitedCell = xor(cell1, cell2, partOfMaze);
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

    let i = r - 2, j = c - 1;
    while (maze[i][j].wall) {
        maze[i][j].wall = false;
        j--;
    }
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