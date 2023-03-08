import { library } from "@fortawesome/fontawesome-svg-core"
import {
	faDownload,
	faMagnifyingGlassChart,
	faMagnifyingGlassMinus,
	faMagnifyingGlassPlus
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { createApp } from "vue"
import VueGtag from "vue-gtag"
import VueUniversalModal from "vue-universal-modal"
import "vue-universal-modal/dist/index.css"

import App from "./App.vue"
import "./registerServiceWorker"
import router from "./router"

library.add(
	faMagnifyingGlassChart,
	faMagnifyingGlassMinus,
	faMagnifyingGlassPlus,
	faDownload
)

createApp(App)
	.use(VueGtag, {
		appName: "SENSE",
		config: {
			id: "G-ZJ6DG3RY8S",
			params: {
				send_page_view: true
			}
		}
	})
	.use(router)
	.use(VueUniversalModal, {
		teleportTarget: "#modals"
	})
	.component("font-awesome-icon", FontAwesomeIcon)
	.mount("#app")
