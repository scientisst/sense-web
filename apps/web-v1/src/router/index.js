import { createRouter, createWebHashHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView
	},
	{
		path: "/live",
		name: "live",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/LiveView.vue"),
		props: {
			header: true,
			content: true
		}
	},
	{
		path: "/not-compatible",
		name: "not-compatible",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "about" */ "../views/NotCompatible.vue"
			),
		props: {
			header: true,
			content: true
		}
	},
	{
		path: "/settings",
		name: "settings",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/SettingsView.vue"),
		props: {
			header: true,
			content: true
		}
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
