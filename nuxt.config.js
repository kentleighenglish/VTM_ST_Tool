const socketPath = "/socket";

export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,
	target: "server",

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: (title) => `${title ? title + " | " : "" }VTM ST Tool`,
		htmlAttrs: {
			lang: "en",
		},
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "" },
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/icon?family=Material+Icons",
			},
			{
				rel: "stylesheet",
				href:
				"https://fonts.googleapis.com/css?family=Montserrat|Nunito|Open+Sans:400,700",
			},
		],
	},
	router: {
		extendRoutes(routes, resolve) {
			routes.push({
				path: "/sheets/create",
				component: resolve(__dirname, "pages/sheetsView.vue"),
				props: { createMode: true }
			})
			routes.push({
				path: "/sheets/:id",
				component: resolve(__dirname, "pages/sheetsView.vue")
			})
		},
		linkActiveClass: "active",
		linkExactActiveClass: "active-exact"
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ["@/plugins/socket"],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		["@/server/socket", { socketPath }],
		'@nuxtjs/axios',
		// ["@/server/socket", { socketPath }],
		"@nuxtjs/style-resources"
	],
	// Modules: https://go.nuxtjs.dev/config-modules

	// Build Configuration: https://go.nuxtjs.dev/config-build
	styleResources: {
		scss: ["./scss/_global.scss"],
		hoistUseStatements: true
	},
	css: ["./scss/bootstrap.scss"],
	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
		baseURL: '/'
	},
	publicRuntimeConfig: {
		socketPath,
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
	},
	server: {
	}
}
