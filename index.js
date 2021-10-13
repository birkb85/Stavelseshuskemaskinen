let mediaRecorder = new MyMediaRecorder(mediaRecorderCallbackOnStop);

let recordingModal = new bootstrap.Modal(document.getElementById('recordingModal'));

let audioUrls = [];

let switchToPlayButton = document.getElementById('switchToPlayButton');
let switchToRecordButton = document.getElementById('switchToRecordButton');

let recordButtons = [];
recordButtons.push(document.getElementById('recordButton0'));
recordButtons.push(document.getElementById('recordButton1'));
recordButtons.push(document.getElementById('recordButton2'));
recordButtons.push(document.getElementById('recordButton3'));

let playButtons = [];
playButtons.push(document.getElementById('playButton0'));
playButtons.push(document.getElementById('playButton1'));
playButtons.push(document.getElementById('playButton2'));
playButtons.push(document.getElementById('playButton3'));

let modeRecord = true;
let switchToPlayAfterRecording = false;

function setModeRecord(switchAfterRecording) {
  modeRecord = true;

  switchToPlayAfterRecording = switchAfterRecording;

  switchToPlayButton.classList.remove("d-none");
  switchToRecordButton.classList.add("d-none");

  playButtons.forEach(playButton => {
    playButton.classList.add("d-none");
  });
  recordButtons.forEach(recordButton => {
    recordButton.classList.remove("d-none");
  });
}

function setModePlay() {
  modeRecord = false;

  switchToPlayButton.classList.add("d-none");
  switchToRecordButton.classList.remove("d-none");

  for (let i = 0; i < recordButtons.length; i++) {
    if (typeof audioUrls[i] !== 'undefined') {
      playButtons[i].classList.remove("d-none");
      recordButtons[i].classList.add("d-none");
    }
  }
}

setModeRecord(false);

function mediaRecorderCallbackOnStop(audioUrl, recordingIndex) {
  audioUrls[recordingIndex] = audioUrl;
  recordButtons[recordingIndex].classList.add("d-none");
  playButtons[recordingIndex].classList.remove("d-none");
  recordingModal.hide();

  if (switchToPlayAfterRecording)
    setModePlay();
}

function resetButtonOnClick() {
  setModeRecord(false);
}

function switchToPlayButtonOnClick() {
  setModePlay();
}

function switchToRecordButtonOnClick() {
  setModeRecord(true);
}

function recordButtonOnClick(recordingIndex) {
  recordingModal.show();

  mediaRecorder.startRecording(recordingIndex);

  setTimeout(async () => {
    mediaRecorder.stopRecording();
  }, 2000);
}

function playButtonOnClick(recordingIndex) {
  mediaRecorder.playRecording(audioUrls[recordingIndex]);
}