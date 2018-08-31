import { VueConstructor } from 'vue'
import { number } from '@/shared/utils/text'
import * as Text from '@/shared/enums/text'

function prefixedWithZero (value: number | string): string {
  return Number(value) <= 9
    ? '0' + value
    : '' + value
}

function noInfo (value: any): any {
  return (
    !value || value === '$0' ||
    (Array.isArray(value) && !value.length)
  )
    ? Text.NO_INFO
    : value
}

export default function (Vue: VueConstructor) {
  Vue.filter('noInfo', noInfo)
  Vue.filter('prefixedWithZero', prefixedWithZero)
  Vue.filter('number', number)
}
