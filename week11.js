console.log($('body'))

//data array 
let boardData = [
    [0,0,0], //value arrays corresponding to each cell on board 
    [0,0,0],
    [0,0,0]
]

//create player
let player = 1
let gameOver = false;
const turnHeading = document.getElementById("turn-heading");

//pull in cells from dom 
const cellElements= document.querySelectorAll('.cell')
console.log (cellElements);

//event listener
cellElements.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        placeMarker(index);  
        console.log("index");
    });
});

//place the X's and O's 
function placeMarker(index) {
//determine row and col from array 
let col= index % 3
//console.log(col);
let row = (index - col) / 3 
//check if cell is empty 
if (boardData[row][col] == 0 && gameOver == false) {   //stops game from being played if game over is false 
 //console.log(row);
 boardData[row][col] = player;
 // taking index value from insividual cells, finding the row and colum value and returning to board data as index number
 turnHeading.textContent = player === 1 ? "Player 2's Turn (O)" : "Player 1's Turn (X)";
 //change player 
 player *= -1;
 // console.log (boardData)
 drawMarkers(); 
 //RESULTS!!
 checkResult();
    }
   
}

//function for drawing markers 
function drawMarkers() {
    //iterate over rows
    for (let row = 0; row < 3; row++) {
//iterate over columns 
        for (let col = 0; col <3; col++){
//player 1 turn 
if(boardData[row][col] == 1){
    //update cell class to add marker 
    cellElements[(row * 3) + col].classList.add("cross") //adds the cross class to corresponding cell clicked 
} else if (boardData[row][col] == -1){
//player 2 (-1) turn 
cellElements[(row * 3) + col].classList.add("circle")
            }
        }

    }
}
// Winner
function checkResult() {
    // Check rows and columns 
    for (let i = 0; i < 3; i++) {
        let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2]; // Sum of row
        let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i]; // Sum of column
        if (rowSum === 3 || colSum === 3) {
            // Player 1 wins
            console.log("Player 1 wins");
            gameEnd(1);
            return;
        } else if (rowSum === -3 || colSum === -3) {
            // Player 2 wins
            console.log("Player 2 wins");
            gameEnd(2);
            return;
        }
    }

    // Check diagonals
    let diaSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2]; // Sum of main diagonal
    let diaSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0]; // Sum of anti-diagonal
    if (diaSum1 === 3 || diaSum2 === 3) {
        // Player 1 wins
        console.log("Player 1 wins");
        gameEnd(1);
        return;
    } else if (diaSum1 === -3 || diaSum2 === -3) {
        // Player 2 wins
        console.log("Player 2 wins");
        gameEnd(2);
        return;
    }

    // Check for a tie
    let isTie = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (boardData[i][j] === 0) {
                isTie = false;
                break;
            }
        }
        if (!isTie) break;
    }
    if (isTie) {
        console.log("It's a tie!");
        gameEnd(0);
    }
}

//game over 
function gameEnd(winner) {
    gameOver = true;
    const resultElement = document.getElementById("result");
    let message;
    if (winner == 0) {
        message = "It's a Tie!";
    } else {
        message = `Congratulations! Player ${winner} has won the game!`;
    }

    // Create a Bootstrap alert element
    const alertElement = document.createElement("div");
    alertElement.className = "alert alert-success";
    alertElement.role = "alert";
    alertElement.textContent = message;

    resultElement.appendChild(alertElement);
}


//restart
const restartButton = document.getElementById("restart")
restartButton.addEventListener("click", () => { //activating restart button in array
    boardData = [
        [0,0,0], //value arrays corresponding to each cell on board 
        [0,0,0],
        [0,0,0] ]

     player = 1
     gameOver = false;
//reset board 
    cellElements.forEach(cell => {
        cell.classList.remove("cross","circle")
    })
});