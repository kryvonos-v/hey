<script>
import Vue from 'vue'
import { tagCssClass } from './movie-info-line-shared'

const RouterLink = 'router-link'

export default Vue.extend({
  functional: true,
  render (h, { data, children }) {
    return (
      <RouterLink class={tagCssClass} {...data}>
        { children }
      </RouterLink>
    )
  }
})
</script>
