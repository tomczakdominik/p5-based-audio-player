function preload() {
  song = loadSound('assets/test_audio.mp3');
}

function setup() {
  createCanvas(350, 400);

  sliderPitch = createSlider(0, 100, 40);
  sliderPitch.position(100, 200)
  sliderPitchLabel = createElement('label', 'pitch');
  sliderPitchLabel.position(50, 200)

  sliderVolume = createSlider(0, 100, 50);
  sliderVolume.position(100, 250)
  sliderVolumeLabel = createElement('label', 'volume');
  sliderVolumeLabel.position(50, 250)

  buttonPlay = createButton('▶');
  buttonPlay.position(100, 300)
  buttonPlay.mousePressed(playSong);

  buttonStop = createButton('▩');
  buttonStop.position(150, 300);
  buttonStop.mousePressed(stopSong);

  buttonPause = createButton('❚❚');
  buttonPause.position(200, 300);
  buttonPause.mousePressed(pauseSong);
}

function draw() {
  background(127);

  var speed = map(sliderPitch.value(), 0, 100, 0.9, 1.1);
  song.rate(speed);

  var volume = map(sliderVolume.value(), 0, 100, 0, 1);
  song.setVolume(volume);
}

function playSong() {
  if (!song.isPlaying()) {
    song.play();
  }
}

function stopSong() {
  song.stop();
}

function pauseSong() {
  song.pause();
}
