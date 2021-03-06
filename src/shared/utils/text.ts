export function truncate (str: string, maxLength: number): string {
  return str.length > maxLength
    ? str.substring(0, maxLength) + '...'
    : str
}

export function trim (str: string, char: string): string {
  if (char === ']') char = '\\]'
  if (char === '\\') char = '\\\\'

  return str.replace(new RegExp(
    '^[' + char + ']+|[' + char + ']+$', 'g'
  ), '')
}

export function removeRepeatedCommas (str: string = ''): string {
  return trim(str.replace(/,+/g, ','), ',')
}

export function number (number: number | string, { decimals = 3, divider = ' ' } = {}): string {
  let numberParts = []
  let numberAsString = number.toString()

  while (numberAsString.length) {
    numberParts.push(numberAsString.slice(-decimals))
    numberAsString = numberAsString.slice(0, -decimals)
  }

  return numberParts.reverse().join(divider)
}
