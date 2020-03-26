var key = [];
key[87] = 0; key[83] = 0; key[65] = 0; key[68] = 0; key[37] = 0; key[38] = 0; key[39] = 0; key[40] = 0; 
var keyEat = 0; // key_to_eat_each_other
var times = 0; // to count how many times updateMyGameArea() is excuted 
var part = [undefined, [], []]; // array of snakes
var food;
var head_of_sneak = 20, part_of_sneak = 14;
function distance(xA, yA, xB, yB) {
	return (Math.sqrt(Math.pow((xA - xB), 2) + Math.pow((yA - yB), 2)));
}
function getRndInteger(min, max) {
		return (Math.random() * (max - min)) + min;
}
function startGame() {
  myGameArea.start();
  creatSnake();
  creatFood();
  // console.log("startGame()");
}
function creatFood() {
  food = new snake(getRndInteger(50, 800), getRndInteger(50, 300), getRndInteger(8, 16), "#ff00ff");
}
function creatSnake() {
  // create snake 1
  part[1][0] = new snake(100, 100, head_of_sneak, "#ff4400"); // the head of the snake
  for (var id_part_cS = 1; id_part_cS < 20; id_part_cS++) { // id_part_cS = index_of_part_createSnake
    if (id_part_cS % 2 == 1)
      part[1][id_part_cS] = new snake(100, 100, part_of_sneak, "green"); // other parts of the snake
	if (id_part_cS % 2 == 0)
      part[1][id_part_cS] = new snake(100, 100, part_of_sneak, "#00cc33"); 
  }
  // create snake 2
  part[2][0] = new snake(800, 400, head_of_sneak, "#ffbb00"); // the head of the snake
  for (var id_part_cS = 1; id_part_cS < 20; id_part_cS++) { // id_part_cS = index_of_part_createSnake
    if (id_part_cS % 2 == 1)
      part[2][id_part_cS] = new snake(900, 380, part_of_sneak, "blue"); // other parts of the snake
	if (id_part_cS % 2 == 0)
      part[2][id_part_cS] = new snake(900, 380, part_of_sneak, "#330099"); 
  }

}
var myGameArea = {
 // create the canvas
  canvas : document.createElement("canvas"),
  
 // specify the canvas
  start : function () {
    this.canvas.width = 1000;
    this.canvas.height = 480;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
    key[e.keyCode] = true;
    })
    window.addEventListener('keyup', function (e) {
      key[e.keyCode] = false;
      })			
  },
  // clear the canvas
  clear : function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // console.log("clear()");
  } 
}
  // construction of part of the snake
function snake(x, y, r, color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color;
  this.speedX = 0;
  this.speedY = 0;

  // draw component in the canvas
  this.update = function () {
    ctx = myGameArea.context;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }
}

  // change position, speed, attribute,...
function newStatus(id_snake_nS) { // id_snake_nS = index_of_snake_newStatus
    
  for (var id_part_nS = part[id_snake_nS].length - 1; id_part_nS >= 1 ; id_part_nS--) { // id_part_nS = index_of_part_newStatus
    part[id_snake_nS][id_part_nS].x = part[id_snake_nS][id_part_nS - 1].x;
    part[id_snake_nS][id_part_nS].y = part[id_snake_nS][id_part_nS - 1].y;
  }
  
  // change the direction of the snake
  part[id_snake_nS][0].x += part[id_snake_nS][0].speedX;
  part[id_snake_nS][0].y += part[id_snake_nS][0].speedY;
  
  // keep the snake in the game area
  if (part[id_snake_nS][0].x < - part[id_snake_nS][0].r) 
    part[id_snake_nS][0].x = myGameArea.canvas.width + part[id_snake_nS][0].r;
  if (part[id_snake_nS][0].x > myGameArea.canvas.width + part[id_snake_nS][0].r)
    part[id_snake_nS][0].x = - part[id_snake_nS][0].r;
  if (part[id_snake_nS][0].y < - part[id_snake_nS][0].r)
    part[id_snake_nS][0].y = myGameArea.canvas.height + part[id_snake_nS][0].r;
  if (part[id_snake_nS][0].y > myGameArea.canvas.height + part[id_snake_nS][0].r) 
    part[id_snake_nS][0].y = - part[id_snake_nS][0].r;
  // console.log("newStatus(" + id_snake_nS + ")");
}

  // end game
function gameOver(id_snake_gO) {
  clearInterval(myGameArea.interval); // delete statement setInterval 
  var ctxEndGame = myGameArea.context;
  ctxEndGame.font = "60px monospace";
  ctxEndGame.fillStyle = "#ff3333";
  if (id_snake_gO == 1)
    ctxEndGame.fillText("Red-Green wins", 200, 200);
  if (id_snake_gO == 2)
    ctxEndGame.fillText("Yellow-Blue wins", 250, 200);
  if (id_snake_gO == 0)
    ctxEndGame.fillText("No one wins", 350, 200);
  // console.log("gameOver (" + id_snake_gO + ")");
}
  // check moving
function checkControl() { // id_snake_cC = index_of_snake_checkControl
  // event listened from keyboard
  // speed is always lower than 10
  if (key[87]) { // key W
	  if (part[1][0].speedY >= - 5) part[1][0].speedY += - 0.5;
	  if (key[65] == 0 && key[68] == 0){
	    if (part[1][0].speedX > 0.5) part[1][0].speedX -= 0.5;
	    if (part[1][0].speedX < - 0.5 ) part[1][0].speedX += 0.5;
	    if (part[1][0].speedX <= 0.5 && part[1][0].speedX >= - 0.5) part[1][0].speedX = 0;
		
	  }
	  console.log("W " +key[65]+ " " + key[68]);
  } 
  if (key[83]) { // key S
	  if (part[1][0].speedY <= 5) part[1][0].speedY += 0.5; 
	  if (key[65] == 0 && key[68] == 0){
	    if (part[1][0].speedX > 0.5) part[1][0].speedX -= 0.5;
	    if (part[1][0].speedX < - 0.5 ) part[1][0].speedX += 0.5;
	    if (part[1][0].speedX <= 0.5 && part[1][0].speedX >= - 0.5) part[1][0].speedX = 0;
	  }
	 // console.log("S");
  }
  if (key[65]) { // key A
	  if (part[1][0].speedX >= - 5) part[1][0].speedX += - 0.5;
	  if (key[87] == 0 && key[83] == 0){
	    if (part[1][0].speedY > 0.5) part[1][0].speedY -= 0.5;
	    if (part[1][0].speedY < - 0.5) part[1][0].speedY += 0.5;
	    if (part[1][0].speedY <= 0.5 && part[1][0].speedY >= - 0.5) part[1][0].speedY = 0;
	  }
	 // console.log("A");
  }
  if (key[68]) { // key D
	  if (part[1][0].speedX <= 5) part[1][0].speedX += 0.5;
	  if (key[87] == 0 && key[83] == 0){
	    if (part[1][0].speedY > 0.5) part[1][0].speedY -= 0.5;
	    if (part[1][0].speedY < - 0.5) part[1][0].speedY += 0.5;
	    if (part[1][0].speedY <= 0.5 && (part[1][0].speedY >= - 0.5)) part[1][0].speedY = 0;
	  }
	 // console.log("D");
  }
  if (key[38]) { // key up
	  if (part[2][0].speedY >= - 5) part[2][0].speedY += - 0.5;
	  if (key[37] == 0 && key[39] == 0){
	    if (part[2][0].speedX > 0.5) part[2][0].speedX -= 0.5;
	    if (part[2][0].speedX < - 0.5 ) part[2][0].speedX += 0.5;
	    if (part[2][0].speedX <= 0.5 && part[2][0].speedX >= - 0.5) part[2][0].speedX = 0;
		
	  }
	 // console.log("up");
  } 
  if (key[40]) { // key down
	  if (part[2][0].speedY <= 5) part[2][0].speedY += 0.5; 
	  if (key[37] == 0 && key[39] == 0){
	    if (part[2][0].speedX > 0.5) part[2][0].speedX -= 0.5;
	    if (part[2][0].speedX < - 0.5 ) part[2][0].speedX += 0.5;
	    if (part[2][0].speedX <= 0.5 && part[2][0].speedX >= - 0.5) part[2][0].speedX = 0;
	  }
	 // console.log("down");
  }
  if (key[37]) { // key left
	  if (part[2][0].speedX >= - 5) part[2][0].speedX += - 0.5;
	  if (key[38] == 0 && key[40] == 0){
	    if (part[2][0].speedY > 0.5) part[2][0].speedY -= 0.5;
	    if (part[2][0].speedY < - 0.5) part[2][0].speedY += 0.5;
	    if (part[2][0].speedY <= 0.5 && part[2][0].speedY >= - 0.5) part[2][0].speedY = 0;
	  }
	 // console.log("left");
  }
  if (key[39]) { // key right
	  if (part[2][0].speedX <= 5) part[2][0].speedX += 0.5;
	  if (key[38] == 0 && key[40] == 0){
	    if (part[2][0].speedY > 0.5) part[2][0].speedY -= 0.5;
	    if (part[2][0].speedY < - 0.5) part[2][0].speedY += 0.5;
	    if (part[2][0].speedY <= 0.5 && (part[2][0].speedY >= - 0.5)) part[2][0].speedY = 0;
	  }
	 // console.log("right");
  }
  // console.log("checkControl()");
}

// food makes snake stronger
function bigger(id_snake_b) {
  for (var id_part_b = 0; id_part_b < part[id_snake_b].length; id_part_b++)
    part[id_snake_b][id_part_b].r += food.r / 50;
  // console.log("Snake" + id_snake_b +" is bigger");
}
function longger(id_snake_l) {
  var l = part[id_snake_l].length;
  part[id_snake_l][l] = new snake(part[id_snake_l][l-1].x, part[id_snake_l][l-1].y, part_of_sneak , part[id_snake_l][l - 2].color); // add one part of the snake;
  // console.log("Snake" + id_snake_cF +" is longer");
}
  // check if food be ate
function checkFood() {
  for (var id_snake_cF = 1; id_snake_cF <= 2; id_snake_cF++)
    if (distance(food.x, food.y, part[id_snake_cF][0].x, part[id_snake_cF][0].y) < food.r + part[id_snake_cF][0].r) {
	 
	  bigger(id_snake_cF);
      longger(id_snake_cF);
      food.x = getRndInteger(50, 800);
      food.y = getRndInteger(50, 300);
	  food.r = getRndInteger(8, 16);
	  // console.log(food.r);
	  // console.log("checkFood()");
  }
}

 // check collision of 2 snakes
function checkCollision() {
  // check 2 heads
  if (distance(part[1][0].x, part[1][0].y, part[2][0].x, part[2][0].y) < part[1][0].r + part[2][0].r) {
    if (part[1][0].r > part[2][0].r) gameOver(1);
	else if (part[1][0].r < part[2][0].r) gameOver(2);
	else if (part[1][0].r == part[2][0].r) gameOver(0);
    return;
  }
  // check snake's head with other snake parts
  for (var id_snake_cCol = 1; id_snake_cCol <= 2; id_snake_cCol++) {
    var id_other_cCol = 3 - id_snake_cCol;
    for (var id_part_cCol = 1; id_part_cCol < part[id_snake_cCol].length; id_part_cCol++) {
	  if (distance(part[id_other_cCol][0].x, part[id_other_cCol][0].y, 
				   part[id_snake_cCol][id_part_cCol].x, part[id_snake_cCol][id_part_cCol].y) < 
				   part[id_other_cCol][0].r + part[id_snake_cCol][id_part_cCol].r) {
				   
		//console.log(id_other_cCol +" "+ id_snake_cCol +" "+  id_part_cCol +" "+ part[id_other_cCol][0].x +' '+ part[id_other_cCol][0].y +' '+  
		//		   part[id_snake_cCol][id_part_cCol].x +' '+  part[id_snake_cCol][id_part_cCol].y  +' '+  
		//		   part[id_other_cCol][0].r  +' '+  part[id_snake_cCol][id_part_cCol].r);
	    gameOver(id_snake_cCol);
		return;
	  
	  }
	}
  }
}

  // update (setInterval)
function updateGameArea() { 

  myGameArea.clear();
  
  for (var id_snake_u = 2; id_snake_u >= 1; id_snake_u--) {
    checkControl();
    newStatus(id_snake_u);
    for (var id_part_u = part[id_snake_u].length - 1; id_part_u >= 0; id_part_u--)
      part[id_snake_u][id_part_u].update();
  }
  
  checkFood();
  food.update();
  checkCollision();
  times++; //console.log("updateGameArea() " + times); // counting

}
