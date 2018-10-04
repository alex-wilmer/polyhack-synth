import './index.css'
import AudioKeys from 'audiokeys'

let ctx = new AudioContext()
let keyboard = new AudioKeys()
let shapes = ["sine", "square", "sawtooth", "triangle"]

let frequency = 1000
let sources = {}

window.onmousemove = event => {
  document.body.style.backgroundColor =
    `hsl(${event.clientX / 3}, 70%, 70%)`

  frequency = event.clientX

  Object.values(sources).forEach(src =>
    src.osc.frequency.value = frequency
  )
}

// nope
// window.onkeydown = event =>
//   osc.start()

keyboard.down(event => {
  if (!sources[event.keyCode]) {
    document.body.style.backgroundColor =
      `hsl(${event.keyCode * 10}, 70%, 70%)`

    let osc = ctx.createOscillator()
    let gain = ctx.createGain()

    gain.gain.value = 0
    gain.gain.linearRampToValueAtTime(
      1,
      ctx.currentTime + 0.1
    )

    osc.frequency.value = event.frequency
    osc.type = shapes[event.keyCode % shapes.length]

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()

    sources[event.keyCode] = {
      osc,
      gain
    }
  }
});

keyboard.up(event => {
    sources[event.keyCode].gain.gain.linearRampToValueAtTime(
      0,
      ctx.currentTime + 0.4
    )
    sources[event.keyCode].osc.stop(ctx.currentTime + 0.5)
    delete sources[event.keyCode]
});
