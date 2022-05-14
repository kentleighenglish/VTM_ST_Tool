<template>
	<nav class="mainNav">
		<div class="mainNav__back" />
		<ul>
			<li v-for="item in items" :key="item.path">
				<router-link :to="item.path">
					{{ item.label }}
				</router-link>
			</li>
		</ul>
		<GlobalSocketStatus />
		<GlobalNoticeBanner />
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		z-index: 1;

		&__back {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;

			background: $grey-lighter;
			z-index: 1;
		}

		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			display: flex;
			z-index: 2;

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
