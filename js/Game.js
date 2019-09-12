var frame;
var isPlay = 1;
window.onload = function () {
  // var audioCtx=new AudioContext();
  document.getElementById("buttonSound").addEventListener("click", musicPlayer);
  window.addEventListener("keydown", function (e) {
    if (e.keyCode === 120 && !self.dead) {
      musicPlayer();
    }
  });
  const c = document.getElementById("canvas");
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  const ctx = c.getContext("2d");

  const background = new Background(c, ctx);
  const bird = new Bird(200, 250, ctx);

  const tubes = [];
  var tubesSpeed = 5;
  let tubePair = generateRandomTubes(ctx, c.width, c.height, tubesSpeed);
  tubes.push(tubePair.top, tubePair.bottom);
  setInterval(function () {
    let tubePair = generateRandomTubes(ctx, c.width, c.height, tubesSpeed);
    tubes.push(tubePair.top, tubePair.bottom);
  }, tubePair.top.interval);
  main();

  function main() {
    //ctx.fillRect(0,0,c.width,c.height);
    bird.update(tubes);
    if (!bird.dead) {
      background.update();

      tubes.forEach(function (tube1) {
        tube1.update();
      });
    }
    background.render();
    tubes.forEach(function (tube1) {
      tube1.render();
    });
    bird.render();
    if (bird.dead) {
      drawGameOver(ctx, c, bird);
    }
    frame = window.requestAnimationFrame(main);
  }
};

var smp = 0;
function musicPlayer() {
  //window.AudioContext = window.AudioContext || window.webkitAudioContext;

  var btnSound = document.getElementById("buttonSound");
  function play(snd) {
    var audioCtx = new AudioContext();

    var request = new XMLHttpRequest();
    request.open("GET", snd, true);
    request.responseType = "arraybuffer";

    request.onload = function () {
      var audioData = request.response;

      audioCtx.decodeAudioData(
        audioData,
        function (buffer) {
          smp = audioCtx.createBufferSource();
          smp.buffer = buffer;
          smp.connect(audioCtx.destination);
          smp.start(0);
        },
        function (e) {
          alert("Error with decoding audio data" + e.err);
        }
      );
    };
    request.send();
  }
  if (btnSound.innerText == "Звук:выкл(F9)") {
    btnSound.innerText = "Звук:вкл(F9)";
    smp.stop(0);
    smp = 0;
  }
  else if (!smp) { btnSound.innerText = "Звук:выкл(F9)"; play("sample.mp3", 0.1); }
}

function generateRandomTubes(ctx, canvasWidth, canvasHeight, tubesSpeed) {
  let heightTop = Math.round(Math.random() * 200 + 50);// Math.random() * ((canvasHeight-50) - 200) + 50;
  let heightBottom = canvasHeight - 200 - heightTop;
  let returnVal = {};
  returnVal.top = new Tube(canvasWidth, -2, heightTop, tubesSpeed, ctx);
  returnVal.bottom = new Tube(
    canvasWidth,
    canvasHeight + 2 - heightBottom,
    heightBottom,
    tubesSpeed,
    ctx
  );
  return returnVal;
}

function fReload() {
  location.reload();
}

function drawGameOver(ctx, c, bird) {
  ctx.font = "37px Impact, Charcoal, sans-serif";
  ctx.textAlign = "center";
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillText("Игра окончена", c.width / 2, c.height / 3);

  var pointsResult = document.getElementById("score").innerText.toString();
  var pointsString = " очков";
  if (pointsResult % 10 == 1) pointsString = " очко";
  if (pointsResult % 10 > 1 && pointsResult % 10 < 5) pointsString = " очка";
  ctx.fillText(pointsResult + pointsString, c.width / 2, c.height / 2);

  if (smp) {smp.stop(0); }
  window.cancelAnimationFrame(frame);
  document.getElementById("score").style.display = "none";
  document.getElementById("buttonSound").style.display = "none";
  var btnReload = document.getElementById("buttonReload");
  btnReload.style.display = "block";
  btnReload.addEventListener("click", fReload);
}
