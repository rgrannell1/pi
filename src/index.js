
const getCommonPrefix = (num0, num1) => {
  const str0 = `${num0}`
  const str1 = `${num1}`

  for (let char = 0; char < Math.max(str0.length, str1.length); ++char) {
    if (str0[char] !== str1[char]) {
      return str0.slice(0, char)
    }
  }

  return str0
}

const randomPair = order => {
  return [
    Math.floor(Math.random() * Math.pow(10, order)),
    Math.floor(Math.random() * Math.pow(10, order))
  ]
}

/*
  Looking for an approximation of π with the following characteristics:

  - the most accurate digits
  - more compressed representations are rewarded, less are punished
  - a less accurate but more compressed approximation is better

  e.g 14 digits represented in 6 characters

  score = 14 x (14/6)

  0 digits represented in 8 characters

  score = 0 x (0/8)

 */

function* candidates(order) {
  let numerator = 1
  let denominator = 1

  while (true) {
    let ratio = numerator / denominator

    if (ratio > 4) {
      numerator = 1
      denominator++
    } else {
      numerator++
    }

    yield [numerator, denominator]
  }
}

function* pi (order) {
  let accurateApprox = {
    score: -1000
  }

  let bounds = Math.pow(10, order)

  for ([numerator, denominator] of candidates(order)) {
    let approximation = numerator / denominator
    let difference = Math.abs(Math.PI - approximation)
    // -- length of the numbers
    let complexity = Math.ceil(Math.log10(numerator)) + Math.ceil(Math.log10(denominator))

    // -- number of accurate decimels
    let accurateTo = Math.abs(Math.floor(Math.log10(difference)))

    let score = accurateTo * (accurateTo / complexity)

    if (score >= accurateApprox.score) {
      const prefix = approximation.toFixed(accurateTo)

      accurateApprox = {
        approximation,
        difference,
        ratio: `${numerator} / ${denominator}`,
        complexity,
        value: prefix
      }

      yield accurateApprox
    }
  }
}

const openingSplash = order => {
  console.log(`
    π π π 🥧 🥧 🥧

    Finding all π approximations (terms bounded by 10^${order})
  `)
}

const closingSplash = count => {
  console.log(`
  Found ${count} approximations

  π π π 🥧 🥧 🥧
  `)

}

const reportValue = data => {
  console.log(`      π ≈ ${data.ratio} (${data.value})`)
}

const showApproximations = order => {
  openingSplash(order)

  for (const approx of pi(order)) {
    reportValue(approx)
  }

  closingSplash(count)
}

showApproximations(3)
