
function Painter(ctx, w, h){
    // Add object properties like this
    this.ctx = ctx;
    this.w = w;
    this.h = h;
}

// Add methods like this.  All Render objects will be able to invoke this
Painter.prototype.fillRect = function(color, rect) {
    this.ctx.fillStyle=color;
    this.ctx.fillRect(this.xscreen(rect.x), this.yscreen(rect.y), rect.w, rect.h);
}

Painter.prototype.drawRect = function(color, rect) {
    this.ctx.strokeStyle=color;
    this.ctx.strokeRect(this.xscreen(rect.x), this.yscreen(rect.y), rect.w, rect.h);
}

Painter.prototype.drawLine = function(color, sx, sy, ex, ey) {
    this.ctx.strokeStyle=color;
    this.ctx.beginPath();
    this.ctx.moveTo(this.xscreen(sx), this.yscreen(sy));
    this.ctx.lineTo(this.xscreen(ex), this.yscreen(ey));
    this.ctx.stroke();
}

Painter.prototype.drawArc = function(color, x, y, r, sAngle, eAngle) {
    this.ctx.strokeStyle=color;
    this.ctx.beginPath();
    //ctx.arc(100,75,50,0,2*Math.PI);
    this.ctx.arc(this.xscreen(x), this.yscreen(y), r, sAngle, eAngle);
    this.ctx.stroke();
}

Painter.prototype.fillArc = function(color, x, y, r, sAngle, eAngle) {
    this.ctx.fillStyle=color;
    this.ctx.beginPath();
    this.ctx.arc(this.xscreen(x), this.yscreen(y), r, sAngle, eAngle);
    this.ctx.fill();
}

Painter.prototype.drawCircle = function(color, x, y, r, sAngle, eAngle) {
    this.drawArc(color, x, y, r, 0, 2*Math.PI);
}

Painter.prototype.fillCircle = function(color, x, y, r, sAngle, eAngle) {
    this.fillArc(color, x, y, r, 0, 2*Math.PI);
}


Painter.prototype.drawText = function(color, font, text, x, y) {
    this.ctx.fillStyle=color;
    this.ctx.font=font;
    x = x - this.ctx.measureText(text).width / 2;
    this.ctx.fillText(text, this.xscreen(x), this.yscreen(y));
}

Painter.prototype.xscreen = function(x)  {
    return x+this.w/2;
}

Painter.prototype.yscreen = function(y)  {
    return y+this.h/2;
}
