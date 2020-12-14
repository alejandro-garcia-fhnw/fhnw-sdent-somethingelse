const video = document.getElementById('video');
const expressions = document.getElementById('expressions');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    //faceapi.draw.drawDetections(canvas, resizedDetections)
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    if (resizedDetections && resizedDetections.length > 0 && resizedDetections[0].expressions) {
      handleExpressions(resizedDetections[0].expressions);
    }
  }, 100);
})

const emotes = Object.freeze({
  'angry' : '😡',
  'sad' : '😢',
  'surprised' : '😲',
  'happy' : '😃',
  'neutral' : '😶'
});
let expressionCount = {};
let started = false;
const questions = [
  ['How was the year 2020?', 'sad']
];
let questionIdx = 0;

function handleExpressions(expressions) {
  // es bitz ä bessere Weg zum d Emotione uslese...
  const expressionElem = document.getElementById('expression');
  let emote = emotes['neutral'];
  for (const [name, score] of Object.entries(expressions)) {
    const isNeutral = (name === 'neutral');
    if (score > 0.7) {
      let count = (expressionCount[name] || 0);
      if (count === 0) {
        expressionCount = {};
        expressionElem.classList = '';
      }
      emote = emotes[name];
      expressionCount[name] = count + 1;
      document.getElementById('progress').value = !isNeutral ? (count * 10) : 0;
      if (!isNeutral && expressionCount[name] > 10) {
        // locked in
        if (started) {
          if (name === questions[questionIdx][1]) {
            expressionElem.classList.add('green');
          } else {
            expressionElem.classList.add('red');
          }
        }
      }
      break;
    }
  }
  expressionElem.innerHTML = emote;
  console.log(expressionCount);
}

document.getElementById('start').addEventListener('click', function(event) {
  const start = event.target || event.srcElement;
  const question = document.getElementById('question');
  question.innerHTML = questions[questionIdx][0];
  question.classList.remove('hidden');
  start.classList.add('hidden');
  started = true;
  console.log('started');
});
