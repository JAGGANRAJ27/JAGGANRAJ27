    // Set up the game environment
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const blockSize = 20;
    let score = 0;
    let snake = [{ x: 8 * blockSize, y: 8 * blockSize }];
    let direction = 'RIGHT';
    let food = generateFood();
    let gameInterval;

    // Update the game
    function gameLoop() {
      // Move the snake
      const head = { ...snake[0] };
      if (direction === 'RIGHT') head.x += blockSize;
      if (direction === 'LEFT') head.x -= blockSize;
      if (direction === 'UP') head.y -= blockSize;
      if (direction === 'DOWN') head.y += blockSize;

      snake.unshift(head);

      // Check if snake hits the wall or itself
      if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || isCollidingWithSnake(head)) {
        clearInterval(gameInterval);
        alert('Game Over! Your score was ' + score);
        document.location.reload();
      }

      // Check if snake eats food
      if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').textContent = score;
        food = generateFood();
      } else {
        snake.pop(); // Remove the last part of the snake
      }

      // Draw everything
      drawGame();
    }

    // Draw the game
    function drawGame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      // Draw the snake
      snake.forEach(segment => {
        ctx.fillStyle = '#33cc33';
        ctx.fillRect(segment.x, segment.y, blockSize, blockSize);
      });
      // Draw the food
      ctx.fillStyle = '#ff6666';
      ctx.fillRect(food.x, food.y, blockSize, blockSize);
    }

    // Generate random food position
    function generateFood() {
      const x = Math.floor(Math.random() * (canvas.width / blockSize)) * blockSize;
      const y = Math.floor(Math.random() * (canvas.height / blockSize)) * blockSize;
      return { x, y };
    }

    // Check if the snake is colliding with itself
    function isCollidingWithSnake(head) {
      return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
    }

    // Control the snake
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
      if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
      if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
      if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    });

    // Start the game loop
    gameInterval = setInterval(gameLoop, 100);
