let w = window.innerWidth;
let h = window.innerHeight;

let num = 100;
let range = 20;

let amp;

let ax = [];
let ay = [];

let wave;
let button;
let playing = false;
let env;

function setup() {
  frameRate(20);
  canvas = createCanvas(w, h);

  env = new p5.Env();
  env.setADSR(0.05, 0.1, 0.5, 1);
  env.setRange(1.2, 0);

  wave = new p5.Oscillator();

  wave.setType('sine');
  wave.start();
  wave.freq(440);
  wave.amp(env);

  button = createButton('play');
  button.mousePressed(toggle);

  attackTimeDiv = createDiv('attack time');
  attackTimeDiv.style('left', '39%');
  attackTimeSlider = createSlider(0, 1 ,0.350, 0.025);


}

function mousePressed() {
  
  // To process the sound
  const filter = new Tone.Filter().toDestination();
  filter.set({
    frequency: "1000",
    type: "highpass",
  });

  // A grain player 
  const player = new Tone.Player(
    "https://bjarnig.s3.eu-central-1.amazonaws.com/sounds/snd.mp3"
  ).connect(filter);

  player.playbackRate = map(mouseX, 0, w, 0.25, 4);
  player.grainSize = map(mouseY, 0, h, 0.01, 0.8);

  player.autostart = true;

  for (let i = 0; i < num; i++) {
    ax[i] = mouseX;
    ay[i] = mouseY;
  }
}

function draw() {
  
  // Shift all elements 1 place to the left
  for (let i = 1; i < num; i++) {
    ax[i - 1] = ax[i];
    ay[i - 1] = ay[i];
  }

  // Put a new value at the end of the array
  ax[num - 1] += random(-range, range);
  ay[num - 1] += random(-range, range);

  // Constrain all points to the screen
  ax[num - 1] = constrain(ax[num - 1], 0, width);
  ay[num - 1] = constrain(ay[num - 1], 0, height);

  // Draw a line connecting the points
  for (let j = 1; j < num; j++) {
    stroke("#fff");
    line(ax[j - 1], ay[j - 1], ax[j], ay[j]);
  } 
}

window.onresize = function () {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas = createCanvas(w, h);
};

function toggle(){
  env.play();
}
