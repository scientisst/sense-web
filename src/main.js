import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vue-universal-modal/dist/index.css'
import VueUniversalModal from 'vue-universal-modal'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlassChart, faMagnifyingGlassMinus, faMagnifyingGlassPlus, faDownload } from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook, faInstagram, faLinkedin, faGithub
} from '@fortawesome/free-brands-svg-icons'

library.add(faMagnifyingGlassChart, faMagnifyingGlassMinus, faMagnifyingGlassPlus, faDownload, faFacebook, faInstagram, faLinkedin, faGithub);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import './registerServiceWorker'

createApp(App).use(router).use(VueUniversalModal, {
    teleportTarget: '#modals'
})
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount('#app')