<template>
	<div class="formInput" @mouseover="onHover">
		<label :for="name">
			<span v-if="label" class="formInput__label">{{ label }}</span>
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
					<option v-for="o in parsedOptions" :key="o.key" :value="o.key">{{ o.label }}</option>
				</select>
			</div>
		</label>
	</div>
</template>
<script>
import { mapActions } from "vuex";

export default {
	name: "FormInput",
	props: {
		meta: {
			type: Object,
			default: () => ({})
		},
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
			type: Object,
			default: () => ({})
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
		},
		parsedOptions () {
			return Object.keys(this.options || {}).reduce((acc, key) => ([
				...acc,
				{ key, label: this.options[key] }
			]), []);
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
		...mapActions({
			updateMetaField: "sheets/updateMetaField"
		}),
		updateValue (value) {
			if (this.type === "checkbox") {
				this.$emit("input", !this.model);
			} else {
				this.$emit("input", value);
			}
		},
		handleChange (e) {
			this.$emit("change", e);
		},
		onHover (i) {
			const { description } = this.meta;
			if (description) {
				const text = typeof description === "function" ? description(this.name, i) : description;

				this.updateMetaField({ text });
			}
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
