const video = document.getElementById('video')
const expressions = document.getElementById('expressions')

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
  const detectionWithExpressions = faceapi.detectSingleFace(video).withFaceExpressions()
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
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
  }, 100)
})

let expressionCount = {};
const emotes = Object.freeze({
  "angry" : "😡",
  "sad" : "😢",
  "surprised" : "😲",
  "happy" : "😃",
  "neutral" : "😶"
});

function handleExpressions(expressions) {
    // es bitz ä bessere Weg zum d Emotione uslese...
    let emote = emotes["neutral"];
    for (const [key, value] of Object.entries(expressions)) {
      if (value > 0.7) {
        let count = (expressionCount[key] || 0);
        if (count === 0) {
          expressionCount = {};
        }
        expressionCount[key] = count + 1;
        if (expressionCount[key] > 10) {
          emote = emotes[key];
          // locked in
        }
      }
    }
    document.getElementById("expressions").innerHTML = emote;
    console.log(expressionCount);
}
