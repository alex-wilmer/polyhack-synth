import './index.css'
// scene 1: super basic

let shapes = ["sine", "square", "sawtooth", "triangle"]
let ctx = new AudioContext()
// let osc = ctx.createOscillator()
// osc.connect(ctx.destination)

let frequency = 1000
let oscillators = {}
// window.onmousemove = event =>
//   osc && (osc.frequency.value = event.clientX)
window.onmousemove = event => {
  document.body.style.backgroundColor =
    `hsl(${event.clientX / 3}, 70%, 70%)`
  frequency = event.clientX
  Object.values(oscillators).forEach(osc =>
    osc.frequency.value = frequency
  )
}

// osc.start()

// nope
// window.onkeydown = event =>
//   osc.start()


window.onkeydown = event => {
  if (!oscillators[event.key]) {
    let osc = ctx.createOscillator()
    osc.frequency.value = frequency
    osc.type = shapes[event.keyCode % shapes.length]
    osc.connect(ctx.destination)
    osc.start()

    oscillators[event.key] = osc
  }
}

window.onkeyup = event => {
  oscillators[event.key].stop()
  delete oscillators[event.key]
}
