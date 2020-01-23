
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
    Math.floor(Math.random() * order),
    Math.floor(Math.random() * order),
  ]
}

function* pi (order) {
  let accurateApprox = {
    difference: 1e10
  }

  for (let numerator = 1; numerator < Math.pow(10, order); ++numerator) {
    for (let denominator = 1; denominator < Math.pow(10, order); ++denominator) {
      let approximation = numerator / denominator
      let difference = Math.abs(Math.PI - approximation)
      let complexity = `${numerator}${denominator}`.length

      if (difference < accurateApprox.difference) {
        accurateApprox = {
          approximation,
          difference,
          ratio: `${numerator} / ${denominator}`,
          complexity,
          value: getCommonPrefix(Math.PI, approximation)
        }

        yield accurateApprox
      }
    }
  }
}

const showApproximations = order => {
  for (const approx of pi(order)) {
    console.log(approx)
  }
}

showApproximations(5)
