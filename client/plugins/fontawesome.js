import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faUser, faLock, faSignOutAlt, faCog, faTable, faCircle, faToggleOff, faToggleOn,
  faBuilding, faFileInvoice, faTv, faUserCog, faUsers, faAsterisk, faChevronRight,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(
  faUser, faLock, faSignOutAlt, faCog, faTable, faCircle, faToggleOff, faToggleOn,
  faBuilding, faFileInvoice, faTv, faUserCog, faUsers, faAsterisk, faChevronRight,
  faChevronDown,
)

Vue.component('Fa', FontAwesomeIcon)
