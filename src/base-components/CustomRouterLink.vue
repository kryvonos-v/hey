<script>
// We don't use typescript for this component,
// because currently Vue + JSX + TypeScript is not yet supported.
// See issue on GitHub: https://github.com/Microsoft/TypeScript/issues/13260
import Vue, { VNode } from 'vue'

const RouterLink = 'router-link'

export default Vue.extend({
  functional: true, 

  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },

  render (h, { data, children, props }) {
    if (props.disabled && data && data.attrs) {
      data.attrs.to = ''
    }

    return (
      <RouterLink
        {...data}
        disabled={props.disabled}
        event={props.disabled
          ? ''
          : data.attrs && data.attrs.event
        }
      >
        { children }
      </RouterLink>
    )
  }
})
</script>
