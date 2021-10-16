if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

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
recordButtons.push(document.getElementById('recordButton4'));
recordButtons.push(document.getElementById('recordButton5'));
recordButtons.push(document.getElementById('recordButton6'));
recordButtons.push(document.getElementById('recordButton7'));
recordButtons.push(document.getElementById('recordButton8'));
recordButtons.push(document.getElementById('recordButton9'));
recordButtons.push(document.getElementById('recordButton10'));
recordButtons.push(document.getElementById('recordButton11'));
recordButtons.push(document.getElementById('recordButton12'));
recordButtons.push(document.getElementById('recordButton13'));
recordButtons.push(document.getElementById('recordButton14'));
recordButtons.push(document.getElementById('recordButton15'));

let playButtons = [];
playButtons.push(document.getElementById('playButton0'));
playButtons.push(document.getElementById('playButton1'));
playButtons.push(document.getElementById('playButton2'));
playButtons.push(document.getElementById('playButton3'));
playButtons.push(document.getElementById('playButton4'));
playButtons.push(document.getElementById('playButton5'));
playButtons.push(document.getElementById('playButton6'));
playButtons.push(document.getElementById('playButton7'));
playButtons.push(document.getElementById('playButton8'));
playButtons.push(document.getElementById('playButton9'));
playButtons.push(document.getElementById('playButton10'));
playButtons.push(document.getElementById('playButton11'));
playButtons.push(document.getElementById('playButton12'));
playButtons.push(document.getElementById('playButton13'));
playButtons.push(document.getElementById('playButton14'));
playButtons.push(document.getElementById('playButton15'));

let modeRecord = true;
let switchToPlayAfterRecording = false;

function setModeRecord(switchAfterRecording) {
  modeRecord = true;

  switchToPlayAfterRecording = switchAfterRecording;

  switchToPlayButton.classList.remove("d-none");
  switchToRecordButton.classList.add("d-none");

  for (let i = 0; i < recordButtons.length; i++) {
    playButtons[i].classList.add("d-none");
    recordButtons[i].classList.remove("d-none");
  }
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

  if (recordingIndex == 3)
    document.getElementById('row2').classList.remove("d-none");

  if (recordingIndex == 7)
    document.getElementById('row3').classList.remove("d-none");

  if (recordingIndex == 11)
    document.getElementById('row4').classList.remove("d-none");
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