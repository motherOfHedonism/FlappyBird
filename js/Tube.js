const Tube = function(x, y, height, speed, ctx){
  this.y = y;
  this.x = x;
  this.height = height;
  this.ctx = ctx;
  this.speed = speed;
  this.width = 150;
  this.interval=2500;
};

Tube.prototype.update = function(){
  this.x -= this.speed;
};

Tube.prototype.render = function(){
  this.ctx.save();
  this.ctx.fillStyle = "#000000";
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
  this.ctx.fillStyle = "#325e22";
  this.ctx.fillRect(this.x+5, this.y+5, this.width-10, this.height-10);
  this.ctx.restore();
  // this.ctx.fillStyle = "#FFFFFF";
};
