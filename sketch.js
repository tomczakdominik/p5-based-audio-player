function preload() {
  song = loadSound('assets/test_audio.mp3');
}

function setup() {
  createCanvas(300, 400);

  sliderPitch = createSlider(0, 100, 40);
  sliderPitch.position(100, 200)
  sliderPitchLabel = createElement('label', 'Pitch');
  sliderPitchLabel.position(30, 200)

  sliderVolume = createSlider(0, 100, 50);
  sliderVolume.position(100, 250)
  sliderVolumeLabel = createElement('label', 'Volume');
  sliderVolumeLabel.position(30, 250)

  sliderLowPass = createSlider(0, 100, 50);
  sliderLowPass.position(100, 300)
  sliderLowPassLabel = createElement('label', 'Low Pass');
  sliderLowPassLabel.position(30, 300)

  buttonPlay = createButton('▶');
  buttonPlay.position(100, 350)
  buttonPlay.mousePressed(playSong);

  buttonStop = createButton('▩');
  buttonStop.position(150, 350);
  buttonStop.mousePressed(stopSong);

  buttonPause = createButton('❚❚');
  buttonPause.position(200, 350);
  buttonPause.mousePressed(pauseSong);

  filter = new p5.LowPass();
  song.disconnect();
  filter.process(song);
  fft = new p5.FFT();
}

function draw() {
  background(255);

  var speed = map(sliderPitch.value(), 0, 100, 0.9, 1.1);
  song.rate(speed);

  var volume = map(sliderVolume.value(), 0, 100, 0, 1);
  song.setVolume(volume);

  var filterFreq = map (sliderLowPass.value(), 0, 100, 10, 22050);
  filter.set(filterFreq, 0);
  var spectrum = fft.analyze();
  noStroke();
  fill(0, 0, 0);

  var max_height = 180
  for (var i = 0; i < spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -max_height + map(spectrum[i], 0, 255, max_height, 0);
    rect(x, max_height, width / spectrum.length, h) ;
  }
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
