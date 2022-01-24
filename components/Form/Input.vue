<template>
	<div class="formInput">
		<label :for="name">
			<span class="formInput__label">{{ label }}</span>
			<div class="formInput__field">
				<input
					v-if="plainType"
					v-model="model"
					:type="type"
					@input="updateValue($event.target.value)"
					@change="handleChange($event)"
				></input>
				<select
					v-if="type === 'select'"
					v-model="model"
					@input="updateValue($event.target.value)"
					@change="handleChange($event)"
				>
					<option v-for="o in options" :key="o" :value="o">{{ o }}</option>
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
		},
		value: {
			type: [Number, String],
			default: null
		}
	},
	data: () => ({
		model: null,
		passwordVisible: false
	}),
	computed: {
		plainType () {
			return !["select", "textarea"].includes(this.type);
		}
	},
	created () {
		this.model = this.value;
	},
	mounted () {
		this.model = this.value;
	},
	methods: {
		updateValue (value) {
			if (this.type === "checkbox") {
				this.$emit("input", !this.model);
			} else {
				this.$emit("input", value);
			}
		},
		handleChange (e) {
			this.$emit("change", e);
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
