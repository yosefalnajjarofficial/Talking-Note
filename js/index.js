const words = document.querySelector('.words');
const btn = document.querySelector('.note');
const close = document.querySelector('.close');
const text = document.querySelector('.text');

close.addEventListener('click', e => {
  words.classList.toggle('hide');
});

btn.addEventListener('click', e => {
  words.classList.toggle('hide');
});

let p = document.createElement('p');
text.appendChild(p);

// Set The Voice/Speech Recognition Based On The Browser
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();
recognition.interimResults = true;

recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');
  p.textContent = transcript;
  if (e.results[0].isFinal) {
    p = document.createElement('p');
    text.appendChild(p);
  }

  if (transcript.includes('open')) words.classList.toggle('hide');
  if (transcript.includes('close this note')) words.classList.toggle('hide');
});

recognition.addEventListener('end', recognition.start);

recognition.start();
