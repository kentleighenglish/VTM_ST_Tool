<template>
	<nav class="mainNav">
		<div v-if="adminMode" class="mainNav__back" />
		<ul v-if="adminMode">
			<li v-for="item in items" :key="item.path">
				<router-link :to="item.path">
					{{ item.label }}
				</router-link>
			</li>
		</ul>
		<GlobalSocketStatus v-if="adminMode" />
	</nav>
</template>
<script>
import { mapState } from "vuex";

export default {
	name: "GlobalNav",
	data: () => ({
		items: [
			{ label: "Home", path: "/" },
			{ label: "Characters", path: "/characters" },
			{ label: "Create Character", path: "/characters/create" },
			{ label: "Session", path: "/session" }
		]
	}),
	computed: {
		...mapState({
			adminMode ({ adminMode }) {
				return adminMode;
			}
		})
	}
}
</script>
<style lang="scss">
	.mainNav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		z-index: 3;

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
