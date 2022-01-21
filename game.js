let lastRenderTime = 0;
let SNAKE_SPEED = 8;
let newSegments = 0;
let food = {x:10,y:1}
const EXPANSION_RATE = 2
const GRID_SIZE = 21
let gameOver = false;


let snakeBody = [
  {x:10,y:11},
  ]

const gameBoard = document.querySelector("#game-board");

function main(currentTime){
	if(gameOver){
		return alert('YOY LOSE')
	}
    
	window.requestAnimationFrame(main);
	const secondsLastRender = (currentTime-lastRenderTime)/1000
	if(secondsLastRender<1/SNAKE_SPEED) return
	lastRenderTime = currentTime;
	update()
	draw()
}
 window.requestAnimationFrame(main);


function update(){

  updateSnake();
  updateFood();
  checkDeath();
}


function draw(){
	gameBoard.innerHTML=""
  drawSnake(gameBoard);
  drawFood(gameBoard);
}


function checkDeath(){
	gameOver = outsideGrid(getSnakeHead())||snakeIntersection()
}


// sanke update and draw part


function updateSnake(){
	  addSegments()
	  const inputDirection = getInputDirection()
   for(let i = snakeBody.length-2; i>=0; i--){
   	snakeBody[i+1] = {...snakeBody[i]}
   	console.log("hey")
   }

   snakeBody[0].x += inputDirection.x
   snakeBody[0].y += inputDirection.y
   // console.log(snakeBody)


}


function drawSnake(gameBoard){
	 snakeBody.forEach(segment=>{
		const snakeElement = document.createElement('div')
		snakeElement.style.gridRowStart = segment.y
  snakeElement.style.gridColumnStart = segment.x
  snakeElement.classList.add('snake')
  gameBoard.appendChild(snakeElement)
  console.log("snake")
})
}

// input direction
let inputDirection = {x:0,y:0}
lastInputDirection = {X:0,Y:0}
window.addEventListener('keydown',e=>{
  switch(e.key){
  	case'ArrowUp':
  	 if (lastInputDirection.y!==0) break
  	 inputDirection = {x:0,y:-1}
  	 break
  	case'ArrowDown':
  	 if (lastInputDirection.y!==0) break
  	 inputDirection = {x:0,y:1}
  	 break
  	case'ArrowLeft':
  	 if (lastInputDirection.x!==0) break
  	 inputDirection = {x:-1,y:0}
  	 break
  	case'ArrowRight':
  	 if (lastInputDirection.x!==0) break
  	 inputDirection = {x:1,y:0}
  	 break
   }
  })

function getInputDirection(){
	lastInputDirection = inputDirection
	return inputDirection
}


//draw food on grid and update food randomly




function updateFood(){
   if(onSnake(food)){
   	expandSnake(EXPANSION_RATE)
    food = getRandomFoodPosition()
   }
}
function drawFood(gameBoard){
	const foodElement = document.createElement('div');
	foodElement.style.gridRowStart = food.y
 foodElement.style.gridColumnStart = food.x
 foodElement.classList.add('food')
 gameBoard.appendChild(foodElement)
}


function expandSnake(amount){
	newSegments += amount
}

function onSnake(position,{ignoreHead = false}={}){
	return snakeBody.some((segment,index) => {
		if(ignoreHead && index==0) return false
		return equalPositions(segment,position)
	})
}

function snakeIntersection(){
	return onSnake(snakeBody[0],{ignoreHead: true})
}
function equalPositions(pos1,pos2){
	return pos1.x===pos2.x && pos1.y===pos2.y
}


function addSegments(){
	for(let i=0; i<newSegments; i++){
		snakeBody.push({...snakeBody[snakeBody.length-1]})
	}
	newSegments = 0
}



function getRandomFoodPosition(){
	let newFoodPosition

	while(newFoodPosition == null || onSnake(newFoodPosition)){
		newFoodPosition = randomGridPosition()
	}
	return newFoodPosition
}


function randomGridPosition(){

 return {
 	x: Math.floor(Math.random()*GRID_SIZE)+1,
 	y: Math.floor(Math.random()*GRID_SIZE)+1
 }
}


//game over
function getSnakeHead(){
	return snakeBody[0]
}




function outsideGrid(position){
	return(
		position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE)
}
