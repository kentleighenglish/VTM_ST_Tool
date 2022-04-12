<template>
	<div class="formInput">
		<label :for="name">
			<span class="formInput__label">label</span>
			<div class="formInput__field">
				field
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
		value: {
			type: [Number, String],
			default: null
		},
		_meta: {
			type: Object,
			default: () => ({})
		}
	},
	data: () => ({
		model: null
	}),
	computed: {
		plainType () {
			return !["select", "textarea"].includes(this.type);
		},
		fieldType () {
			return this._meta.fieldType;
		}
	},
	watch: {
		value (v) {
			this.model = v;
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
