(function () {
    'use strict';

    // Easter egg trigger: 5 clicks on profile photo within 2 seconds
    var photo = document.getElementById('photo');
    var clicks = [];
    var REQUIRED_CLICKS = 5;
    var TIME_WINDOW = 2000;

    photo.addEventListener('click', function () {
        var now = Date.now();
        clicks.push(now);
        clicks = clicks.filter(function (t) { return now - t < TIME_WINDOW; });
        if (clicks.length >= REQUIRED_CLICKS) {
            clicks = [];
            openGame();
        }
    });

    // Game overlay
    var overlay = document.getElementById('gameOverlay');
    var closeBtn = document.getElementById('gameClose');
    var startBtn = document.getElementById('startSnakeBtn');
    var canvas = document.getElementById('snake-canvas');
    var ctx = canvas.getContext('2d');
    var scoreEl = document.getElementById('snakeScore');

    function openGame() {
        overlay.hidden = false;
        // Force reflow for transition
        overlay.offsetHeight;
        initSnake();
    }

    function closeGame() {
        stopSnake();
        overlay.hidden = true;
    }

    closeBtn.addEventListener('click', closeGame);
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeGame();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !overlay.hidden) closeGame();
    });

    // Snake game
    var GRID = 20;
    var CELL = 18;
    var snake, food, dir, nextDir, score, loop, running;

    function initSnake() {
        var isMobile = window.innerWidth <= 480;
        CELL = isMobile ? 14 : 18;
        var size = CELL * GRID;
        canvas.width = size;
        canvas.height = size;
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';

        snake = [{ x: 5, y: 10 }, { x: 4, y: 10 }, { x: 3, y: 10 }];
        dir = 'right';
        nextDir = 'right';
        score = 0;
        scoreEl.textContent = '0';
        running = false;
        startBtn.textContent = 'Start';
        placeFood();
        draw();
    }

    function placeFood() {
        do {
            food = {
                x: Math.floor(Math.random() * GRID),
                y: Math.floor(Math.random() * GRID)
            };
        } while (snake.some(function (s) { return s.x === food.x && s.y === food.y; }));
    }

    function draw() {
        // Background
        var bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid lines
        ctx.strokeStyle = 'rgba(128, 128, 128, 0.08)';
        ctx.lineWidth = 1;
        for (var i = 0; i <= GRID; i++) {
            ctx.beginPath();
            ctx.moveTo(i * CELL, 0);
            ctx.lineTo(i * CELL, canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * CELL);
            ctx.lineTo(canvas.width, i * CELL);
            ctx.stroke();
        }

        // Food
        var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
        ctx.fill();

        // Snake
        snake.forEach(function (seg, i) {
            ctx.fillStyle = i === 0 ? accent : (accent + 'cc');
            ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
        });
    }

    function move() {
        dir = nextDir;
        var head = { x: snake[0].x, y: snake[0].y };

        if (dir === 'up') head.y--;
        else if (dir === 'down') head.y++;
        else if (dir === 'left') head.x--;
        else if (dir === 'right') head.x++;

        if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID ||
            snake.some(function (s) { return s.x === head.x && s.y === head.y; })) {
            gameOver();
            return;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreEl.textContent = score;
            placeFood();
        } else {
            snake.pop();
        }

        draw();
    }

    function gameOver() {
        stopSnake();
        startBtn.textContent = 'Play Again';

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 20px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 8);
        ctx.fillStyle = '#fff';
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height / 2 + 16);
    }

    function startSnake() {
        if (running) return;
        initSnake();
        running = true;
        startBtn.textContent = 'Playing...';
        loop = setInterval(move, 120);
    }

    function stopSnake() {
        if (loop) {
            clearInterval(loop);
            loop = null;
        }
        running = false;
    }

    startBtn.addEventListener('click', function () {
        if (!running) startSnake();
    });

    // Keyboard controls
    document.addEventListener('keydown', function (e) {
        if (overlay.hidden || !running) return;
        var key = e.key;
        if ((key === 'ArrowUp' || key === 'w') && dir !== 'down') { nextDir = 'up'; e.preventDefault(); }
        else if ((key === 'ArrowDown' || key === 's') && dir !== 'up') { nextDir = 'down'; e.preventDefault(); }
        else if ((key === 'ArrowLeft' || key === 'a') && dir !== 'right') { nextDir = 'left'; e.preventDefault(); }
        else if ((key === 'ArrowRight' || key === 'd') && dir !== 'left') { nextDir = 'right'; e.preventDefault(); }
    });

    // Touch/swipe controls
    var touchX = 0, touchY = 0;
    canvas.addEventListener('touchstart', function (e) {
        if (!running) return;
        touchX = e.touches[0].clientX;
        touchY = e.touches[0].clientY;
        e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });

    canvas.addEventListener('touchend', function (e) {
        if (!running) return;
        var dx = e.changedTouches[0].clientX - touchX;
        var dy = e.changedTouches[0].clientY - touchY;
        if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0 && dir !== 'left') nextDir = 'right';
            else if (dx < 0 && dir !== 'right') nextDir = 'left';
        } else {
            if (dy > 0 && dir !== 'up') nextDir = 'down';
            else if (dy < 0 && dir !== 'down') nextDir = 'up';
        }
        e.preventDefault();
    }, { passive: false });
})();
