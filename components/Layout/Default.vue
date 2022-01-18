<template>
	<div class="layout__default">
		<GlobalNav />
		<div class="content">
			<slot />
		</div>
	</div>
</template>
<script>
export default {
	name: "LayoutDefault"
}
</script>
