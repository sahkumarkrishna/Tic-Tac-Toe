let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn"); // Corrected the selector ID
let newGameBtn = document.querySelector("#new-btn"); // Corrected variable name to match event listener
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; // playerO starts

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("disabled"); // Use a class to visually indicate disabled boxes if needed
        box.addEventListener("click", boxClick, { once: true }); // Ensure box is clickable only once
    });
};

const boxClick = (event) => {
    const box = event.target;
    box.innerText = turnO ? "O" : "X";
    turnO = !turnO;
    checkWinner();
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.classList.add("disabled"); // Visually indicate they are disabled, but also...
        box.removeEventListener("click", boxClick); // ...physically prevent clicks
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let winnerDeclared = false;
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            showWinner(boxes[a].innerText);
            winnerDeclared = true;
            break;
        }
    }
    if (!winnerDeclared && Array.from(boxes).every(box => box.innerText !== '')) {
        msg.innerText = "It's a tie!";
        msgcontainer.classList.remove("hide");
    }
};

// Adding click event listeners
boxes.forEach((box) => {
    box.addEventListener("click", boxClick, { once: true });
});

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
