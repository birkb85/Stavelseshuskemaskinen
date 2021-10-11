// https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b
// https://github.com/bryanjenningz/record-audio

class MyMediaRecorder {
    constructor(callbackOnStop/*, callbackOnDataAvailable*/) {
        this.mediaRecorder = null;
        this.resetRecording();
        this.recordingIndex = 0;
        // this.recordingTimeStart = null;

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.mediaRecorder = new MediaRecorder(stream);

                this.mediaRecorder.addEventListener("dataavailable", event => {
                    this.audioChunks.push(event.data);
                    // TODO BB 2021-10-11. Send tid siden start tilbage.
                    // this.recordingTimeStart ++;
                    // callbackOnDataAvailable(this.recordingTimeStart);
                });

                this.mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(this.audioChunks);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    callbackOnStop(audioUrl, this.recordingIndex);
                });
            });
    }

    resetRecording() {
        this.audioChunks = [];
    }

    startRecording(recordingIndex) {
        this.recordingIndex = recordingIndex;
        this.resetRecording();
        // this.recordingTimeStart = 10; // TODO BB 2021-10-11. Sæt start tid.
        this.mediaRecorder.start();
    }

    stopRecording() {
        this.mediaRecorder.stop();
    }

    playRecording(audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
    }
}