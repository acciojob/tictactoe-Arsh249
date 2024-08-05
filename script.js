const submitButton = document.getElementById('submit');
        const player1Input = document.getElementById('player-1');
        const player2Input = document.getElementById('player-2');
        const messageDiv = document.querySelector('.message');
        const boardDiv = document.querySelector('.board');
        const cells = document.querySelectorAll('.cell');

        let player1 = '';
        let player2 = '';
        let currentPlayer = '';
        let currentSymbol = 'X';
        let gameActive = true;

        submitButton.addEventListener('click', () => {
            player1 = player1Input.value;
            player2 = player2Input.value;

            if (player1 && player2) {
                currentPlayer = player1;
                messageDiv.textContent = `${currentPlayer}, you're up`;
                boardDiv.style.display = 'block';
                document.querySelector('.input-names').style.display = 'none';
            }
        });

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                if (gameActive && cell.textContent === '') {
                    cell.textContent = currentSymbol;
                    if (checkWin()) {
                        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
                        gameActive = false;
                    } else if (isDraw()) {
                        messageDiv.textContent = `It's a draw!`;
                        gameActive = false;
                    } else {
                        currentPlayer = currentPlayer === player1 ? player2 : player1;
                        currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
                        messageDiv.textContent = `${currentPlayer}, you're up`;
                    }
                }
            });
        });

        function checkWin() {
            const winPatterns = [
                [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
                [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
                [1, 5, 9], [3, 5, 7]             // diagonals
            ];

            return winPatterns.some(pattern => {
                return pattern.every(index => {
                    return cells[index - 1].textContent === currentSymbol;
                });
            });
        }

        function isDraw() {
            return Array.from(cells).every(cell => cell.textContent !== '');
        }