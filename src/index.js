import './index.css'
import AudioKeys from 'audiokeys'
// scene 1: super basic

let keyboard = new AudioKeys()
let shapes = ["sine", "square", "sawtooth", "triangle"]
let ctx = new AudioContext()
// let osc = ctx.createOscillator()
// osc.connect(ctx.destination)

keyboard.down(note => {
  if (!sources[note.keyCode]) {
    document.body.style.backgroundColor =
      `hsl(${note.keyCode * 10}, 70%, 70%)`

    let osc = ctx.createOscillator()
    let gain = ctx.createGain()

    gain.gain.value = 0
    gain.gain.linearRampToValueAtTime(
      1,
      ctx.currentTime + 0.1
    )

    osc.frequency.value = note.frequency
    osc.type = shapes[note.keyCode % shapes.length]

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()

    sources[note.keyCode] = {
      osc,
      gain
    }
  }
  // do things with the note object
});

keyboard.up(note => {
  // do things with the note object
    sources[note.keyCode].gain.gain.linearRampToValueAtTime(
      0,
      ctx.currentTime + 0.4
    )
    sources[note.keyCode].osc.stop(ctx.currentTime + 0.5)
    delete sources[note.keyCode]
});

let frequency = 1000
let sources = {}
// window.onmousemove = event =>
//   osc && (osc.frequency.value = event.clientX)
window.onmousemove = event => {
  document.body.style.backgroundColor =
    `hsl(${event.clientX / 3}, 70%, 70%)`
  frequency = event.clientX
  Object.values(sources).forEach(src =>
    src.osc.frequency.value = frequency
  )
}

// osc.start()

// nope
// window.onkeydown = event =>
//   osc.start()


window.onkeydown = event => {
  // console.log(event.keyCode)

  // if (!sources[event.key]) {
  //   let osc = ctx.createOscillator()
  //   let gain = ctx.createGain()
  //
  //   gain.gain.value = 0
  //   gain.gain.linearRampToValueAtTime(
  //     1,
  //     ctx.currentTime + 0.1
  //   )
  //
  //   osc.frequency.value = frequency
  //   osc.type = shapes[event.keyCode % shapes.length]
  //
  //   osc.connect(gain)
  //   gain.connect(ctx.destination)
  //
  //   osc.start()
  //
  //   sources[event.key] = {
  //     osc,
  //     gain
  //   }
  // }
}

// window.onkeyup = event => {
//   sources[event.key].gain.gain.linearRampToValueAtTime(
//     0,
//     ctx.currentTime + 0.4
//   )
//   sources[event.key].osc.stop(ctx.currentTime + 0.5)
//   delete sources[event.key]
// }
