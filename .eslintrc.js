module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false
	},
	extends: [
		'@nuxtjs',
		'plugin:nuxt/recommended'
	],
	plugins: [
	],
	// add your custom rules here
	rules: {
		"semi": "off",
		"no-tabs": "off",
		"indent": ["error", "tab"],
		"vue/html-indent": ["error", "tab"],
		"quotes": ["error", "double"],
	}
}
