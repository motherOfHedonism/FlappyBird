const Bird = function(x, y, ctx) {
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.gravityY = 0;
  this.width = 90;
  this.height = 64;
  this.ticks = 0;
  this.spriteIndex = 0;
  this.dead = false;
  this.score = 0;
  this.rate = 15;
  this.speedY = 5;
  this.sprites = [
    document.getElementById("bird1"),
    document.getElementById("bird2"),
    document.getElementById("bird3")
  ];
  var self = this;
  window.addEventListener("keydown", function(e) {
    if (e.keyCode === 32 && !self.dead) {
      self.gravityY = -self.speedY;
    }
  });
};

Bird.prototype.update = function(tubes) {
  this.y += this.gravityY;
  this.gravityY += 0.5;
  if (this.detectCollisions(tubes)) {
    this.dead = true;
  }
  if (this.y >= window.innerHeight || this.y - this.height / 2 < 0)
    this.dead = true;
  this.ticks++;
  if (this.ticks % this.rate === 0)
    this.spriteIndex = (this.spriteIndex + 1) % this.sprites.length;
};

Bird.prototype.render = function() {
  let renderX = -this.width / 2;
  let renderY = -this.height / 2;
  this.ctx.save();
  this.ctx.translate(this.x, this.y);
  this.ctx.drawImage(this.sprites[this.spriteIndex], renderX, renderY);
  this.ctx.restore();
};

Bird.prototype.detectCollisions = function(tubes) {
  for (var i = 0; i < tubes.length; i++) {
    let e = tubes[i];
    let highTube = e.y <= 0;
    let x0 = e.x,
      x1 = e.x + e.width;
    let alpha2 = this.x + 44;
    let beta2 = this.y;
    if (highTube) {
      let y0 = e.y + e.height;
      let alpha = this.x;
      let beta = this.y - this.height / 2;
      if (
        (alpha > x0 && alpha < x1 && beta < y0) ||
        (alpha2 > x0 && alpha2 < x1 && beta2 < y0)
      ) {
        return true;
      }
      //else if (this.x === e.x+e.width)
      else if ((alpha > x0 && alpha < x1) || (alpha2 > x0 && alpha2 < x1)) {
        //  let temp=0;
        //  if(i==0) temp=i+1;
        //  else if(i==1) temp=i+1;
        //  else temp=i%2+1;
        document.getElementById("score").innerHTML = i / 2 + 1;
      }
    } else {
      let y2 = e.y;
      let a = this.x;
      let b = this.y + this.height / 2;
      if (
        (a > x0 && a < x1 && b > y2) ||
        (alpha2 > x0 && alpha2 < x1 && beta2 > y2)
      ) {
        return true;
      }
    }
  }
  return false;
};
