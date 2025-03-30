import {defineNuxtPlugin} from '#app'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {fas} from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
