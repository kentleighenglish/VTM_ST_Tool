<template>
	<GlobalActions :character-id="characterId" />
</template>
<script>
export default {
	name: "CharacterActions",
	props: {
		characterId: String
	}
}
</script>
