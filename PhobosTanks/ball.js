function Ball(mapWidth, mapHeight, startX, startY, directionX, directionY) {
    this.power = 5;
    this.radius = 4;

    // the "life-space"
    this.minX = this.radius;
    this.minY = this.radius;
    this.maxX = mapWidth - this.radius;
    this.maxY = mapHeight - this.radius;

    this.speedX = directionX * this.power;
    this.speedY = directionY * this.power;

    this.cx = startX;
    this.cy = startY;
}

Ball.prototype.draw = function(context) {

    context.fillStyle = "black";
    context.beginPath();
    context.arc(this.cx, this.cy, this.radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}
Ball.prototype.update = function() {
    this.cx += this.speedX;
    this.cy += this.speedY;

    if (this.cx < this.minX || this.cx > this.maxX ||
        this.cy < this.minY || this.cy > this.maxY)
        return true;
    return false;
}