// function to calculate the distance between two objects.
function distanceBetween(x1, x2) {
  return (x2 - x1);
}


class GameObject {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101, 171);
  }
}


// Enemies for our player to avoid.
class Enemy extends GameObject {
  constructor(x, y, dx) {
    super(x, y);
    this.dx = dx;
    this.sprite = 'images/enemy-bug.png';
  }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, player) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x > canvas.width) {
    this.x = -101;
  }
  this.x += (this.dx*dt);

  // code to handle collision:
  if ((distanceBetween(this.x, player.x) < 79) &&
    (this.y === player.y) &&
    (distanceBetween(this.x, player.x) > -79)) {
      player.x = 300;
      player.y = 305;
  }
};




// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player extends GameObject {
  constructor(x ,y) {
    super(x, y);
    this.sprite = 'images/char-boy.png';
  }
}


// handleInput is the function to handle the keyboard input for moves.
Player.prototype.handleInput = function(move) {
  if ((move === 'left') && (this.x > 0)) {
    this.x -= 100;
  } if ((move === 'right') && (this.x < 301)) {
    this.x +=100;
  } if ((move === 'down') && (this.y < 306)){
    this.y += 80;
  } if (move === 'up') {
    this.y -= 80;
    if (this.y < 65) {
      document.removeEventListener('keyup', handler);
      bool = false;
    }
  }
};


// instantiate player object.
var player1 = new Player(300,385);


// instantiate enemies objects and place them in an array called allEnemies
const allEnemies = [];

for (var i = 0; i < 3; i++) {
  allEnemies.push(new Enemy((-101+200*i), 225, 100));
}

allEnemies.push(new Enemy(200, 145, 250));

for (var i = 0; i < 2; i++) {
  allEnemies.push(new Enemy((-101+300*i), 65, 150));
}


// the handler callback function for the Event Listener.
function handler(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
  };
  // This listens for key presses and sends the keys to your
  // Player.handleInput() method.
  player1.handleInput(allowedKeys[e.keyCode]);
}


document.addEventListener('keyup', handler);

// used to aid stopping animation when the game ends.
var bool = true;
