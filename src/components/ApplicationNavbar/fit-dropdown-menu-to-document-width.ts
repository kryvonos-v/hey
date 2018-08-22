import { DirectiveOptions } from 'vue'

function fitDropdownMenuToDocumentWidth (el: HTMLElement): void {
  let dropdownMenuEl = <HTMLElement>el.querySelector('.dropdown-menu')

  if (!dropdownMenuEl) return

  dropdownMenuEl.style.width = document.body.clientWidth + 'px'
}

let resizeHandler: undefined | EventListener = undefined

let directive: DirectiveOptions = {
  bind (el: HTMLElement) {
    if (resizeHandler) throw new Error('fit-dropdown-menu-to-document-width directive designed to be in use only for single elment')

    resizeHandler = (event: Event) => fitDropdownMenuToDocumentWidth(el)

    window.addEventListener('resize', resizeHandler)
  },
  inserted (el: HTMLElement) {
    fitDropdownMenuToDocumentWidth(el)
  },
  unbind (el: HTMLElement) {
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler)
    }

    resizeHandler = undefined
  }
}

export default directive