const colorClasses = [
  'has-text-danger',
  'has-text-warning',
  'has-text-dark',
  'has-text-primary',
  'has-text-success' ]

// lowest, low, neutral, medium, high
export default (scaleArr, value) => {
  let minDiff = Infinity
  let colorIndex = 2

  scaleArr.forEach((scale, i) => {
    const diff = Math.abs(value - scale)
    if (diff < minDiff) {
      minDiff = diff
      colorIndex = i
    }
  })

  return colorClasses[colorIndex]
}
