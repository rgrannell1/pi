
function* candateRatios(order:number) {
  let numerator = 1
  let denominator = 1

  while (denominator < Math.pow(10, order)) {
    let ratio = numerator / denominator

    if (ratio > 3.15) {
      denominator++
      numerator = Math.floor(denominator * 3.12)
    } else {
      numerator++
    }

    yield [numerator, denominator]
  }
}

function* pi (order:number) {
  let accurateApprox

  let bounds = Math.pow(10, order)

  for (let [numerator, denominator] of candateRatios(order)) {
    let approximation = numerator / denominator
    let difference = Math.abs(Math.PI - approximation)
    // -- length of the numbers
    let complexity = Math.ceil(Math.log10(numerator)) + Math.ceil(Math.log10(denominator))

    // -- number of accurate decimels
    let accurateTo = Math.abs(Math.floor(Math.log10(difference)))

    let score = accurateTo * (accurateTo / complexity)

    if (!accurateApprox || score >= accurateApprox.score) {
      const prefix = approximation.toFixed(accurateTo)

      accurateApprox = {
        approximation,
        difference,
        ratio: `${numerator} / ${denominator}`,
        complexity,
        value: prefix,
        score
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

const closingSplash = (count, order) => {
  console.log(`
  Found ${count} approximations under 10^${order}

  π π π 🥧 🥧 🥧
  `)

}

const reportValue = data => {
  console.log(`      π ≈ ${data.ratio} (${data.value})`)
}

const showApproximations = order => {
  openingSplash(order)

  let count = 0
  for (const approx of pi(order)) {
    reportValue(approx)
    ++count
  }

  closingSplash(count, order)
}

showApproximations(6)
