<template>
	<div class="formTable">
		<span v-if="label" class="healthDotsInput__label">{{ label }}</span>
		<div class="formTable__actions">
			<FormInput
				v-if="addOptions"
				v-model="add"
				name="tableAdd"
				type="select"
				:searchable="true"
				:options="addOptions"
				:disable-meta-display="true"
				:create-mode="createMode"
				:admin-mode="adminMode"
				:xp-check="xpCheck"
				:xp-spend-update="xpSpendUpdate"
				:xp-spend-reset="xpSpendReset"
			/>
			<FormButton
				:disabled="isAddDisabled"
				@click="addItem($event)"
				@disabledClick="addItemFailed($event)"
			>
				Add
			</FormButton>
		</div>
		<div class="formTable__table">
			<CommonTable :columns="tableColumns" :rows="parsedItems" :triggers="tableTriggers" />
		</div>
	</div>
</template>
<script>
import { mapActions } from "vuex";

export default {
	name: "FormTable",
	props: {
		name: {
			type: String,
			default: null
		},
		label: {
			type: String,
			default: null
		},
		value: {
			type: Array,
			default: null
		},
		originalValue: {
			type: Array,
			default: null
		},
		meta: {
			type: Object,
			default: () => ({})
		},
		disableMetaDisplay: Boolean,
		createMode: Boolean,
		adminMode: Boolean,
		xpCheck: {
			type: Function,
			default: () => {}
		},
		xpSpendUpdate: {
			type: Function,
			default: () => {}
		},
		xpSpendReset: {
			type: Function,
			default: () => {}
		}
	},
	data: () => ({
		model: null,
		add: null
	}),
	computed: {
		addCost () {
			const getAdd = this.meta?.getXpAddCost;

			return getAdd ? getAdd() : 0;
		},
		isAddDisabled () {
			return !this.xpCheck({ name: this.name, cost: this.addCost }) || !this.add
		},
		fieldType () {
			return this.meta.fieldType;
		},
		fieldsMeta () {
			return this.meta?.params?.fieldsMeta || {};
		},
		tableColumns () {
			return this.meta?.columns || {};
		},
		addOptions () {
			const { addOptions } = (this.meta || {});
			if (addOptions) {
				return typeof addOptions === "function" ? addOptions() : addOptions;
			}

			return {};
		},
		parsedItems () {
			if (!this.model || !Array.isArray(this.model)) {
				return [];
			}

			return this.model;
		},
		tableTriggers () {
			return {
				updateItem: (updatedItem) => {
					const model = (this.model || []).map(item =>
						item.id === updatedItem.id ? updatedItem : item
					);

					this.updateValue(model);
				},
				removeItem: (item) => {
					const model = [...this.model];
					const index = model.findIndex(i => i.id === item.id);

					model.splice(index, 1);

					this.updateValue(model);
				}
			}
		}
	},
	watch: {
		value (v) {
			this.model = [...v];
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
			pushToastMessage: "toast/pushMessage"
		}),
		updateValue (value) {
			this.$emit("input", [...value]);
		},
		handleChange (e) {
			this.$emit("change", e);

			this.updateValue(e);
		},
		addItem (e) {
			if (this.add && this.add.length) {
				const item = this.meta.createItem(this.add);

				this.updateValue([
					...(this.model || []),
					item
				]);
			}
		},
		addItemFailed (e) {
			const xpCost = this.addCost;
			console.log(e);
			if (!this.xpCheck({ name: this.name, cost: xpCost })) {
				this.pushToastMessage({
					type: "warning",
					body: `You need ${xpCost}xp to add this`
				});
			}
		}
	}
}
</script>
<style lang="scss">
	.formTable {
		padding: 0 $gap;

		&__actions {
			display: flex;
		}

		.table {
			&__heading {
				color: $grey-dark;
				font-size: 0.9em;
				font-weight: 500;
				border-bottom: 1px solid $grey;
			}
		}
	}
</style>
