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
        console.log("iteration " + iterations);

        let w = getRandomItem(walls);
        let cell1, cell2; //  cells that the wall divides
        console.log("(" + w.i + ", " + w.j + ")");
        if (w.i % 2 == 0) {
            console.log("Horizontal wall");
            cell1 = maze[w.i - 1][w.j];
            cell2 = maze[w.i + 1][w.j];
        }
        else if (w.j % 2 == 0) {
            console.log("Vertical wall");
            cell1 = maze[w.i][w.j - 1];
            cell2 = maze[w.i][w.j + 1];
        }
        console.log("Cells: (" + cell1.i + ", " + cell1.j + "), (" + cell2.i + ", " + cell2.j + ") -> " + partOfMaze.has(cell1) + ", " + partOfMaze.has(cell2));

        let notVisitedCell = xor(cell1, cell2, partOfMaze);
        console.log("Not visited: (" + notVisitedCell.i + ", " + notVisitedCell.j + ")")
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

function mazeG(x,y) {
    var n=x*y-1;
    if (n<0) {alert("illegal maze dimensions");return;}
    var horiz=[]; for (var j= 0; j<x+1; j++) horiz[j]= [];
    var verti=[]; for (var j= 0; j<y+1; j++) verti[j]= [];
    var here= [Math.floor(Math.random()*x), Math.floor(Math.random()*y)];
    var path= [here];
    var unvisited= [];
    for (var j= 0; j<x+2; j++) {
        unvisited[j]= [];
        for (var k= 0; k<y+1; k++)
            unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
    }
    while (0<n) {
        var potential= [[here[0]+1, here[1]], [here[0],here[1]+1],
            [here[0]-1, here[1]], [here[0],here[1]-1]];
        var neighbors= [];
        for (var j= 0; j < 4; j++)
            if (unvisited[potential[j][0]+1][potential[j][1]+1])
                neighbors.push(potential[j]);
        if (neighbors.length) {
            n= n-1;
            next= neighbors[Math.floor(Math.random()*neighbors.length)];
            unvisited[next[0]+1][next[1]+1]= false;
            if (next[0] == here[0])
                horiz[next[0]][(next[1]+here[1]-1)/2]= true;
            else 
                verti[(next[0]+here[0]-1)/2][next[1]]= true;
            path.push(here= next);
        } else 
            here= path.pop();
    }

    for (let i = 0; i < horiz.length; i++) {
        for (let j = 0; j < horiz.length; j++) {
            horiz
        }
    }
    return ({x: x, y: y, horiz: horiz, verti: verti});
}

function display(m) {
	var text= [];
	for (var j= 0; j<m.x*2+1; j++) {
		var line= [];
		if (0 == j%2)
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4) 
					line[k]= '+';
				else
					if (j>0 && m.verti[j/2-1][Math.floor(k/4)])
						line[k]= ' ';
					else
						line[k]= '-';
		else
			for (var k=0; k<m.y*4+1; k++)
				if (0 == k%4)
					if (k>0 && m.horiz[(j-1)/2][k/4-1])
						line[k]= ' ';
					else
						line[k]= '|';
				else
					line[k]= ' ';
		if (0 == j) line[1]= line[2]= line[3]= ' ';
		if (m.x*2-1 == j) line[4*m.y]= ' ';
		text.push(line.join('')+'\r\n');
	}
	return text.join('');
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

window.onload = function() {
    printM(primMaze(15, 15));
}