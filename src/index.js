
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

      if (difference < accurateApprox.difference && approximation > 3 && approximation < 4) {
        const prefix = getCommonPrefix(Math.PI, approximation)
        accurateApprox = {
          approximation,
          difference,
          ratio: `${numerator} / ${denominator}`,
          complexity,
          value: prefix.endsWith('.')
            ? prefix.replace('.', '')
            : prefix
        }

        yield accurateApprox
      }
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

  let count = 0
  for (const approx of pi(order)) {
    reportValue(approx)
    ++count
  }

  closingSplash(count)
}

showApproximations(10)
