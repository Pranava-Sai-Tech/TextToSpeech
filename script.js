// Speech Synthesis
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = speechSynthesis.getVoices();
  if (voices.length === 0) {
    setTimeout(populateVoices, 100); // Retry if voices are not loaded yet
    return;
  }

  voicesDropdown.innerHTML = voices
    .filter((voice) => voice.lang.includes("en"))
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
}

function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  msg[this.name] = this.value;
  toggle();
}

// Manually trigger voice population on page load
window.onload = function () {
  speechSynthesis.onvoiceschanged = populateVoices;
  populateVoices();
};

voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOption));
speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", () => toggle(false));

