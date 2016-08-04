function Tank(mapWidth, mapHeight,context){
	this.context = context;
	this.mapWidth = mapWidth;
	this.mapHeight = mapHeight;
	this.radius = 14;
	this.speedX = 0;
	this.speedY = 0;
	this.power = 3;
	this.cx = mapWidth/2;
	this.cy = mapHeight-this.radius;
	this.angle = 0;
	this.balls = [];
	this.cannonHeight = this.radius/2;
	this.cannonWidth = this.cannonHeight*3;
	this.scores = 0;
}
Tank.prototype.draw = function(){
	
	var context = this.context;
	context.save();
	context.fillStyle = "green";
	context.beginPath();	
	context.rect(this.left, this.top, this.radius*2, this.radius*2);
	context.closePath();
	context.fill();

	// cannon	
	context.save();
	context.translate(this.cx,this.cy);
	context.rotate(this.angle);
	context.fillStyle = "red";
	context.beginPath();		
	context.rect(0,-this.cannonHeight/2,this.cannonWidth,this.cannonHeight);
	context.closePath();
	context.fill();
	context.restore();

	// yellow circle		
	context.fillStyle = "yellow";
	context.beginPath();
	context.arc(this.cx,this.cy,this.radius/2,0,Math.PI*2,true);
	context.closePath();
	context.fill();
	context.restore();
	
	for(var i=0;i<this.balls.length;i++)
	{
		this.balls[i].draw(context);
	}

}


Tank.prototype.update = function(obstacles) {

    for (var i = 0; i < this.balls.length; i++) {
        var ball = this.balls[i];
        if (ball.update()) {
            this.balls.splice(i - 1);
        } else {
            for (var j = 0; j < obstacles.length; j++) {
                var ob = obstacles[j];

                if (ob.collide(ball.cx, ball.cy)) {
                    // Do something ích
                    this.balls.splice(i - 1);
                    break;
                }
            }
        }
    }
}
Tank.prototype.handleInput = function(keyStates){
	this.speedX = 0;
	this.speedY = 0;

	if(keyStates[Keys.KEY_A])
		this.moveLeft();
	if(keyStates[Keys.KEY_D])
		this.moveRight();
	this.move();
}
Tank.prototype.fire = function() {
    if (this.balls.length > 4)
        return;
    var directionX = Math.cos(this.angle);
    var directionY = Math.sin(this.angle);

    var startX = this.cx + this.cannonWidth * directionX;
    var startY = this.cy + this.cannonWidth * directionY;

    var ball = new Ball(this.mapWidth, this.mapHeight, startX, startY, directionX, directionY);
    this.balls.push(ball);
}
Tank.prototype.rotateCannon = function(targetX, targetY) {
    var dx = targetX - this.cx;
    var dy = targetY - this.cy;
    this.angle = Math.atan2(dy, dx);
}
Tank.prototype.move = function() {
    this.cx += this.speedX;
    this.cy += this.speedY;

    this.left = this.cx - this.radius;
    this.top = this.cy - this.radius;
    this.right = this.cx + this.radius;
    this.bottom = this.cy + this.radius;
}

Tank.prototype.moveUp = function() {
    this.speedY = -this.power;
}
Tank.prototype.moveDown = function() {
    this.speedY = this.power;
}
Tank.prototype.moveLeft = function() {
    this.speedX = -this.power;
}
Tank.prototype.moveRight = function() {
    this.speedX = this.power;
}
