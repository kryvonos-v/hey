import { DirectiveOptions, VNodeDirective } from 'vue'

interface ClickOutsideInstance {
  el: HTMLElement,
  modifiers: { [key: string]: boolean },
  fn: (event: MouseEvent) => any
}

const isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0
const instances: ClickOutsideInstance[] = []
const events: string[] = isTouch ? ['touchstart', 'click'] : ['click']

function onEvent (event: MouseEvent): void {
  instances.forEach(({ el, modifiers, fn }) => {
    if (
      event.type === 'touchstart' &&
      modifiers.notouch
    ) return
  
    if (
      event.target !== el &&
      !el.contains(event.target)
    ) {
      fn && fn(event)
    }
  })
}

const directive: DirectiveOptions = {
  bind (el: HTMLElement, binding: VNodeDirective) {
    const handler = binding.value

    instances.push({
      el,
      fn: handler,
      modifiers: binding.modifiers
    })

    if (instances.length === 1) {
      events.forEach(e => document.addEventListener(e, onEvent, true))
    }
  },

  update (el: HTMLElement, binding: VNodeDirective) {
    if (typeof binding.value !== 'function') {
      throw new Error('Argument must be a function')
    }
    const instance = instances.find(i => i.el === el)

    if (instance) {
      instance.fn = binding.value
    }
  },

  unbind (el: HTMLElement) {
    const instanceIndex = instances.findIndex(i => i.el === el)

    if (instanceIndex >= 0) {
      instances.splice(instanceIndex, 1)
    }

    if (instances.length === 0) {
      events.forEach(e => document.removeEventListener(e, onEvent, true))
    }
  }
}

export default typeof window !== 'undefined' ? directive : {}