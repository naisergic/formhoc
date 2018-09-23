export function checkRegex(regex, value) {
  if (regex && typeof regex.test === 'function') {
    return regex.test(value)
  }
  return true
}
