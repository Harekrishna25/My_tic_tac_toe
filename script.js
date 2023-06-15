let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let winning = new Audio("winning_music.mp3");

const boxElements = document.querySelectorAll(".gamecontainer .box");
const player1 = document.querySelector(".players .player1");
const player2 = document.querySelector(".players .player2");
const result = document.querySelector(".imgbox");
const winning_text =document.querySelector(".winning_text");
const restart = document.querySelector(".reset button");
const gamecontainer = document.querySelector(".gamecontainer");
const Winning_Conditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],

]
const playerO = "O";
const playerX = "X";
let toggleTurn = true;

boxElements.forEach(box=>{
    box.onclick=()=>{
        let currentPlayer = toggleTurn ? playerX : playerO;
        audioTurn.play();
        box.classList.add("disable");
        addInBox(box, currentPlayer);
        if(winnerCheck(currentPlayer)){
            // console.log("WINNER");
            result.classList.remove("inactive");
            winning_text.innerHTML = currentPlayer + " won the game";
            gamecontainer.classList.add("disable");
            gameover.play();
            winning.play();
        }

        else if(isDraw()){
            // console.log("Match Draw");
            winning_text.innerHTML = "Draw The Game!"
        }
        else{
        swapPlayer();
        }
    }
})

function winnerCheck(currentPlayer){
    return Winning_Conditions.some(condition=>{
        // console.log(condition);
        return condition.every(index=>{
            // console.log(index);
            return boxElements[index].classList.contains(currentPlayer);
        })
    })
}

function isDraw(){
    return [...boxElements].every(cell=>{
        return cell.classList.contains(playerX) || cell.classList.contains(playerO);
    })
}
function swapPlayer(){
    toggleTurn = !toggleTurn;
    if(toggleTurn){
        player1.classList.add("active");
        player2.classList.remove("active");
    }
    else{
        player2.classList.add("active");
        player1.classList.remove("active");
    }
}

function addInBox(box, currentPlayer){
    box.innerHTML = currentPlayer;
    box.classList.add(currentPlayer);
}

restart.onclick =()=>{
    location.reload();
}