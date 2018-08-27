import { VueConstructor } from 'vue'

function prefixedWithZero (value: number | string): string {
  return Number(value) <= 9
    ? '0' + value
    : '' + value
}

function number (number: number | string, { decimals = 3, divider = ' ' } = {}): string {
  let numberParts = []
  let numberAsString = number.toString()

  while (numberAsString.length) {
    numberParts.push(numberAsString.slice(-decimals))
    numberAsString = numberAsString.slice(0, -decimals)
  }

  return numberParts.reverse().join(divider)
}

export default function (Vue: VueConstructor) {
  Vue.filter('prefixedWithZero', prefixedWithZero)
  Vue.filter('number', number)
}
