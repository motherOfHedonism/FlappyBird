const Background = function (c, ctx) {
  this.c = c;
  this.ctx = ctx;
  this.bgPosition = 0;
  this.bgSpeed = 2;
  this.bgImg = document.getElementById("bg");
  this.bgWidth = this.bgImg.width;
};
Background.prototype.update = function () {
  this.bgPosition -= this.bgSpeed;
  if (this.bgPosition < -this.bgWidth) this.bgPosition = 0;
};
Background.prototype.render = function () {
  this.ctx.fillStyle = "rgba(43, 49, 52, 1)";
  this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  for (let i = 0; i <= this.c.width / this.bgWidth + 1; i++)
    this.ctx.drawImage(this.bgImg, this.bgPosition + i * this.bgWidth, 0);
};
