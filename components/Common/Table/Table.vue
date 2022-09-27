<template>
	<div class="tableContainer">
		<table class="table">
			<thead>
				<tr>
					<td
						v-for="(col, key) in columns"
						:key="key"
						class="table__heading"
						:style="{ width: `${col.width}px` || null }"
						@click="onSort(key)"
					>
						<span>{{ col.label }}</span>
						<span :class="`table__headingSort ${sortColumn === key && 'table__headingSort--sorted'} ${sortAsc && 'table__headingSort--asc'}`" />
					</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, index) in sortedRows" :key="index" :class="getRowClass(row)">
					<TableCell
						v-for="(col, key) in columns"
						:key="key"
						:column="col"
						:col-key="key"
						:row="row"
						:triggers="triggers"
						@actionTrigger="triggerAction"
					/>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>

export default {
	name: "CommonTable",
	components: {
		TableCell: () => import("./TableCell")
	},
	props: {
		columns: {
			type: Object,
			default: () => ({})
		},
		rows: {
			type: Array,
			default: () => ([])
		},
		rowMods: {
			type: Function,
			default: () => ([])
		},
		triggers: {
			type: Object,
			default: () => ({})
		}
	},
	data: () => ({
		sortColumn: null,
		sortAsc: true
	}),
	computed: {
		sortedRows () {
			if (!this.sortColumn) {
				return this.rows;
			}
			return [...this.rows].sort((
				{ [this.sortColumn]: a = null },
				{ [this.sortColumn]: b = null }
			) => {
				const weight = a < b ? -1 : 1;

				return this.sortAsc ? weight * 1 : weight * -1;
			})
		}
	},
	methods: {
		onSort (key) {
			if (this.sortColumn === key) {
				this.sortAsc = !this.sortAsc;
			}
			this.sortColumn = key;

			this.$emit("onSort", { column: key, ascending: this.sortAsc });
		},
		triggerAction ({ key, func, row }) {
			if (!func && key) {
				this.triggers[key](row);
				return;
			}

			func(row, this);
		},
		getRowClass (row) {
			const className = "table__row";
			const mods = this.rowMods(row).reduce((acc, mod) => ([...acc, `${className}--${mod}`]), []);

			return `${className} ${mods}`;
		}
	}
}

</script>
<style lang="scss">

.tableContainer {
	overflow: auto;
	width: 100%;
	max-width: 100%;
}

table.table {
	width: 100%;
	font-size: 16px;
	border-spacing: 0;

	.table__heading {
		cursor: pointer;
	}

	.table__headingSort {
		display: inline-block;
		width: 10px;
		height: 10px;
		transform-origin: center center;
		transform: translateY(-2.5px);

		&--sorted {
			border: 5px solid transparent;
			border-bottom-color: $primary-dark;
		}

		&--asc {
			transform: rotate(180deg) translateY(-2.5px);
		}
	}

	.table__actions {
		display: flex;
		text-align: right;
	}

	.table__action {
		flex-grow: 1;
		color: $primary;
		font-weight: 600;
		cursor: pointer;
		text-decoration: none;
	}

	td {
		padding: math.div($gap, 2) $gap;
	}

	thead {
		td {
			border-bottom: 2px solid $primary;
			color: $primary-dark;
			font-weight: 600;
		}
	}

	tbody {
		tr:nth-of-type(even) {
			background: $grey-lighter;
		}

		tr.table__row {
			@include generateStateModifiers() using ($color) {

				td:first-child {
					position: relative;
					&:before {
						position: absolute;
						display: block;
						content: "";

						top: 0;
						left: 0;
						height: 100%;
						border-left: 5px solid $color;
					}
				}
			}
		}
	}
}

</style>
