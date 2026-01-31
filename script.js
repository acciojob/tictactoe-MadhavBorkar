//your JS code here. If required.
const submitBtn = document.getElementById("submit");
    const form = document.getElementById("form");
    const game = document.getElementById("game");
    const message = document.querySelector(".message");
    const cells = document.querySelectorAll(".cell");

    let player1 = "";
    let player2 = "";
    let currentPlayer = "";
    let currentSymbol = "X";
    let board = Array(9).fill(null);
    let gameOver = false;

    submitBtn.addEventListener("click", () => {
      player1 = document.getElementById("player-1").value.trim();
      player2 = document.getElementById("player-2").value.trim();

      if (!player1 || !player2) {
        alert("Please enter both player names.");
        return;
      }

      form.classList.add("hidden");
      game.classList.remove("hidden");

      currentPlayer = player1;
      message.textContent = `${currentPlayer}, you're up`;
    });

    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        if (gameOver) return;
        if (cell.textContent !== "") return;

        const index = Number(cell.id) - 1;
        board[index] = currentSymbol;
        cell.textContent = currentSymbol;

        if (checkWinner()) {
          message.textContent = `${currentPlayer} congratulations you won!`;
          gameOver = true;
          return;
        }

        if (board.every(val => val !== null)) {
          message.textContent = "It's a draw!";
          gameOver = true;
          return;
        }

        // Switch turn
        if (currentSymbol === "X") {
          currentSymbol = "O";
          currentPlayer = player2;
        } else {
          currentSymbol = "X";
          currentPlayer = player1;
        }

        message.textContent = `${currentPlayer}, you're up`;
      });
    });

    function checkWinner() {
      const wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      return wins.some(pattern =>
        pattern.every(i => board[i] === currentSymbol)
      );
    }