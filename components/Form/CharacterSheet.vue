<template>
	<div class="characterSheet">
		<p>Character sheet</p>
	</div>
</template>
<script>
export default {
	name: "CharacterSheet",
	props: {
		structure: {
			type: Object,
			default: () => ({})
		}
	}
}
</script>
