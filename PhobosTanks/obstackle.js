var bombImg = new Image();
bombImg.src = "bomb.png";
var explodeImg = new Image();
explodeImg.src = "explosion.png";
var snd = new Audio("explosion.wav");


function Obstacle(mapWidth, mapHeight, context) {
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.context = context;

    this.halfSize = Math.floor(Math.random() * 30) + 30;
    this.size = this.halfSize * 2;

    this.left = Math.floor(Math.random() * (mapWidth - this.size)) + 1;
    this.top = -Math.floor(Math.random() * mapHeight);

    this.speedY = Math.floor(Math.random() * 4) + 1;
    this.speedX = Math.floor(Math.random() * 3) - 3;
    this.angle = (Math.PI / 180) * Math.floor(Math.random() * 360);
    this.isExploded = false;
    this.isCollided = false;
    this.explosionCounter = 3;
}

Obstacle.prototype.draw = function() {
    var img = this.isCollided ? explodeImg : bombImg;

    this.context.save();
    this.context.translate(this.left + this.halfSize, this.top + this.halfSize);
    this.context.rotate(this.angle);
    this.context.drawImage(img, -this.halfSize, -this.halfSize, this.size, this.size);
    this.context.restore();
}

Obstacle.prototype.explode = function() {
    this.isCollided = true;

    snd.currentTime = 0;
    snd.play();
}

Obstacle.prototype.update = function() {
    if (this.isCollided)
        this.explosionCounter--;
    if (this.explosionCounter == 0)
        this.isExploded = true;

    if (this.left < 0 || this.right > this.mapWidth)
        this.speedX = -this.speedX;
    if (this.bottom > this.mapHeight)
        this.explode();

    this.top += this.speedY;
    this.left += this.speedX;
    this.right = this.left + this.size;
    this.bottom = this.top + this.size;
}
Obstacle.prototype.collide = function(x, y) {
    return this.left <= x && this.right >= x &&
        this.top <= y && this.bottom >= y;
}