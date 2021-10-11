let mediaRecorder = new MyMediaRecorder(mediaRecorderCallbackOnStop/*, mediaRecorderCallbackOnDataAvailable*/);

let recordingModal = new bootstrap.Modal(document.getElementById('recordingModal'));
//let recordingModalProgressBar = document.getElementById('recordingModalProgressBar');

let audioUrls = [];

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

function playButtonsHide() {
  playButtons.forEach(playButton => {
    playButton.classList.add("d-none");
  });
  recordButtons.forEach(recordButton => {
    recordButton.classList.remove("d-none");
  });
}

playButtonsHide();

// function mediaRecorderCallbackOnDataAvailable(timeSinceStart) {
//   // TODO BB 2021-10-11. Udregn hvor lang tid der er gået siden start, ud af længden og send procent.
//   recordingModalProgressBar.style.width = timeSinceStart + "%";
// }

function mediaRecorderCallbackOnStop(audioUrl, recordingIndex) {
  audioUrls[recordingIndex] = audioUrl;
  recordButtons[recordingIndex].classList.add("d-none");
  playButtons[recordingIndex].classList.remove("d-none");
  recordingModal.hide();
}

function resetButtonOnClick() {
  playButtonsHide();
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