import { set, get, merge } from "lodash";
import * as characterTypes from "./characterTypes";
import { sheetSkeleton } from "@/data/chardata";
import * as disciplines from "@/data/advantages/disciplines";
import * as backgrounds from "@/data/advantages/backgrounds";
import { setDefault } from "@/utils/tools";

export const title = "Character Advantages";

export const subtitle = "Please allocate dots into your disciplines, background, and virtues";

export const fields = {
	advantages: sheetSkeleton.advantages
};

const disciplinesKeys = Object.keys(disciplines);
const backgroundsKeys = Object.keys(backgrounds);
const virtuesKeys = Object.keys(sheetSkeleton.advantages.fields.virtues.fields
);
const advantages = [
	...disciplinesKeys,
	...backgroundsKeys,
	...virtuesKeys
];

const initialDisciplines = Object.keys(characterTypes).reduce((acc, key) => ({
	...acc,
	[key]: characterTypes[key].initialDisciplines
}), {});
const initialBackgrounds = Object.keys(characterTypes).reduce((acc, key) => ({
	...acc,
	[key]: characterTypes[key].initialBackgrounds
}), {});
const initialVirtues = Object.keys(characterTypes).reduce((acc, key) => ({
	...acc,
	[key]: characterTypes[key].initialVirtues
}), {});

const getType = (name) => {
	if (name === "disciplines" || disciplinesKeys.includes(name)) {
		return "disciplines";
	} else if (name === "backgrounds" || backgroundsKeys.includes(name)) {
		return "backgrounds";
	} else if (virtuesKeys.includes(name)) {
		return "virtues";
	}
};

const getMaxSpend = (form, type, characterType) => {
	let baseDots = 0;
	const disciplineBase = initialDisciplines[characterType] || 0;
	const backgroundsBase = initialBackgrounds[characterType] || 0;
	const virtuesBase = initialVirtues[characterType] || 0;

	if (type === "disciplines") {
		baseDots = disciplineBase || 0;
	} else if (type === "backgrounds") {
		baseDots = backgroundsBase || 0;
	} else if (type === "virtues") {
		baseDots = virtuesBase || 0;
	}

	let fields;
	if (type === "virtues") {
		fields = (form.sheet?.advantages?.[type] || {});
	} else {
		const { _custom, ...listFields } = get(form, `sheet.advantages.${type}.list`, {});
		fields = listFields;
	}

	Object.values(fields).forEach((val) => {
		if (type === "virtues") {
			val--;
		}

		baseDots = baseDots - Math.max(val || 0, 0);
	});

	return baseDots;
}

export const overrideField = (field, name, form, { characterType }) => {
	if (["disciplines", "backgrounds"].includes(name)) {
		const listField = field.fields.list;
		const maxSpendDots = getMaxSpend(form, name, characterType);
		const { meta: { params: { fieldsMeta: oldFieldsMeta } } } = listField;

		const fieldsMeta = (data = {}, { propPath, ...additional } = { propPath: [] }) => (fieldName) => {
			const newPropPath = [...propPath];
			newPropPath.push(fieldName);

			const oldMeta = oldFieldsMeta(data, { propPath, ...additional })(fieldName);

			const value = get(data, newPropPath, 0);
			let maxSpend = value + maxSpendDots;

			if (name === "disicplines") {
				maxSpend = Math.min(3, maxSpend);
			}

			return merge(
				oldMeta,
				{
					params: {
						maxSpendDots: maxSpend
					},
					getXpCost: ({ current, target }) => {
						return target - current
					}
				}
			);
		}

		field = set(field, "fields.list.meta.disableAdd", name === "disciplines");
		field = set(field, "fields.list.meta.getXpAddCost", () => 0);
		field = set(field, "fields.list.meta.params.fieldsMeta", fieldsMeta);

		return field;
	} else if (virtuesKeys.includes(name)) {
		const type = getType(name);
		const maxSpendDots = getMaxSpend(form, type, characterType);

		return {
			...field,
			meta: {
				...field.meta,
				params: {
					...field.meta.params,
					maxSpendDots: (model, { propPath }) => {
						const value = get(model, propPath, 0);
						return value + maxSpendDots;
					}
				},
				getXpCost: ({ current, target }) => {
					return target - current
				}
			}
		}
	}

	return field;
}

export const xpCheck = ({ name, cost, form, definition }) => {
	const { characterType } = definition;

	if (name === "list" && cost === 0) {
		return true;
	}

	if (advantages.includes(name)) {
		const type = getType(name);
		const maxSpendDots = getMaxSpend(form, type, characterType);

		return cost <= maxSpendDots;
	}

	return false;
}

export const stageComplete = (form, { characterType, abilityPriority }) => {
	const disciplinesSpend = getMaxSpend(form, "disciplines", characterType);
	const backgroundsSpend = getMaxSpend(form, "backgrounds", characterType);
	const virtuesSpend = getMaxSpend(form, "virtues", characterType);

	return (
		disciplinesSpend === 0 &&
		backgroundsSpend === 0 &&
		virtuesSpend === 0
	);
}

export const stageEvents = {
	enter: (form) => {
		setDefault(form, "sheet.advantages.virtues.conscienceConviction", 1);
		setDefault(form, "sheet.advantages.virtues.selfControl", 1);
		setDefault(form, "sheet.advantages.virtues.courage", 1);

		return { updatedForm: form };
	}
}
