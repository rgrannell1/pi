
let diff = Math.PI
const BOUND = 1e15

function asApprox (ratio) {
  const pi = `${Math.PI}`
  const piRatio = `${ratio}`


    if (pi[char] !== piRatio[char]) {
      return pi.slice(0, char)
    }
  }
}

function * pi () {
  while (true) {
    let numerator = Math.floor(Math.random() * BOUND)
    let denominator = Math.floor(Math.random() * BOUND)

    const piRatio = numerator / denominator
    const piDiff = Math.abs(Math.PI - piRatio)

    if (piDiff < diff) {
      diff = piDiff
      yield [`${numerator}/${denominator}`, asApprox(piRatio), piDiff]
    }
  }

}

for (const [ratio, approx, distance] of pi()) {
  console.log(`${ratio} ${approx} ${distance}`)
}
