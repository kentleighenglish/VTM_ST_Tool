<template>
	<div class="formInput">
		<label :for="name">
			<span class="formInput__label">{{ label }}</span>
			<div class="formInput__field">
				<input v-if="plainType" :type="type" />
				<select v-if="type === 'select'">
					<option v-for="o in options" :key="o" :value="e">{{ o }}</option>
				</select>
			</div>
		</label>
	</div>
</template>
<script>
export default {
	name: "FormInput",
	props: {
		name: {
			type: String,
			default: null
		},
		label: {
			type: String,
			default: null
		},
		type: {
			type: String,
			default: "text"
		},
		options: {
			type: Array,
			default: () => ([])
		}
	},
	computed: {
		plainType () {
			return !["select", "textarea"].includes(this.type);
		}
	}
}
</script>
<style lang="scss">
	.formInput {
		display: block;
		width: 100%;
		margin: math.div($gap, 2) 0;

		label {
			display: flex;
			width: 100%;
		}

		.formInput__label {
			display: flex;
			width: 100%;
		}

		.formInput__field {
			width: 100%;
			max-width: 400px;
			border-bottom: 1px solid $grey;
			background: $grey-lighter;

			input, select {
				width: 100%;
				background: none;
				border: none;
				margin: 0;
				padding: math.div($gap, 4);
			}
		}
	}
</style>
