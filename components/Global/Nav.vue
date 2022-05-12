<template>
	<nav class="mainNav">
		<ul>
			<li v-for="item in items" :key="item.path">
				<router-link :to="item.path">
					{{ item.label }}
				</router-link>
			</li>
		</ul>
	</nav>
</template>
<script>
export default {
	name: "GlobalNav",
	data: () => ({
		items: [
			{ label: "Home", path: "/" },
			{ label: "Sheets", path: "/sheets" },
			{ label: "Create Sheet", path: "/sheets/create" }
		]
	})
}
</script>
<style lang="scss">
	.mainNav {
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			display: flex;
			background: $grey-lighter;

			li {

				a {
					display: block;
					padding: $gap ($gap * 2);

					text-decoration: none;
					color: $grey-darkest;

					&:hover {
						background: $grey-light;
					}
				}
			}
		}
	}
</style>
