import { VueConstructor } from 'vue'
import { number } from '@/shared/utils/text'

function prefixedWithZero (value: number | string): string {
  return Number(value) <= 9
    ? '0' + value
    : '' + value
}

export default function (Vue: VueConstructor) {
  Vue.filter('prefixedWithZero', prefixedWithZero)
  Vue.filter('number', number)
}
