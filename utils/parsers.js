import { get } from "lodash";
import * as disciplines from "@/data/advantages/disciplines";
import { healthLevels } from "@/data/status";

export const getCharacterName = (character) => {
	const characterName = character.sheet?.details?.info?.name;
	const showName = character.chronicle?.showName || false;
	const altName = character.chronicle?.altName;

	return showName ? characterName : (altName || "Stranger");
}

export const decodeHealthValue = (value) => {
	const splitVal = String(value || 0).split("").reverse();

	return [
		...Array(Number(splitVal[2] || 0)).fill("agg"),
		...Array(Number(splitVal[1] || 0)).fill("lethal"),
		...Array(Number(splitVal[0] || 0)).fill("bashing")
	];
};

export const encodeHealthValue = (array = []) => {
	return array.reduce((acc, val) => {
		if (val === "agg") {
			return acc + 100;
		} else if (val === "lethal") {
			return acc + 10;
		} else if (val === "bashing") {
			return acc + 1;
		}

		return acc;
	}, 0);
}

export const getHealthStatus = (sheet) => {
	const healthArray = decodeHealthValue(get(sheet, "status.other.health", null));

	const healthStatus = (healthLevels[healthArray.length - 1] || {});

	return healthStatus;
}

export const getHealthMod = sheet => getHealthStatus(sheet).dicePoolMod || 0;

export const getSuccesses = (diceResult, difficulty = 6, successModifier = 0, botchModifier = 0) => {
	const successes = diceResult.reduce((acc, roll) => {
		if (roll === 10) {
			acc += 2;
		} else if (roll === 1) {
			if (botchModifier > 0) {
				botchModifier--;
			} else {
				acc--;
			}
		} else if (roll >= difficulty) {
			acc++;
		} else if (roll < difficulty && successModifier > 0) {
			successModifier--;
			acc++;
		}

		return acc;
	}, 0);

	const crit = successes > 5;
	const botch = successes < 0;

	return {
		count: successes,
		status: (!crit && !botch) ? null : (crit ? "crit" : "botch"),
		output: successes < 0 ? "Botch" : `${successes} Success${successes === 1 ? "" : "es"}`
	};
};

export const getStats = charSheet => ({
	strength: get(charSheet, "attributes.physical.strength", 0),
	dexterity: get(charSheet, "attributes.physical.dexterity", 0),
	stamina: get(charSheet, "attributes.physical.stamina", 0),
	charisma: get(charSheet, "attributes.social.charisma", 0),
	manipulation: get(charSheet, "attributes.social.manipulation", 0),
	appearance: get(charSheet, "attributes.social.appearance", 0),
	perception: get(charSheet, "attributes.mental.perception", 0),
	intelligence: get(charSheet, "attributes.mental.intelligence", 0),
	wits: get(charSheet, "attributes.mental.wits", 0),
	alertness: get(charSheet, "abilities.talents.alertness", 0),
	athletics: get(charSheet, "abilities.talents.athletics", 0),
	awareness: get(charSheet, "abilities.talents.awareness", 0),
	brawl: get(charSheet, "abilities.talents.brawl", 0),
	empathy: get(charSheet, "abilities.talents.empathy", 0),
	expression: get(charSheet, "abilities.talents.expression", 0),
	intimidation: get(charSheet, "abilities.talents.intimidation", 0),
	leadership: get(charSheet, "abilities.talents.leadership", 0),
	streetwise: get(charSheet, "abilities.talents.streetwise", 0),
	subterfuge: get(charSheet, "abilities.talents.subterfuge", 0),
	animalKen: get(charSheet, "abilities.skills.animalKen", 0),
	crafts: get(charSheet, "abilities.skills.crafts", 0),
	drive: get(charSheet, "abilities.skills.drive", 0),
	etiquette: get(charSheet, "abilities.skills.etiquette", 0),
	firearms: get(charSheet, "abilities.skills.firearms", 0),
	larceny: get(charSheet, "abilities.skills.larceny", 0),
	melee: get(charSheet, "abilities.skills.melee", 0),
	performance: get(charSheet, "abilities.skills.performance", 0),
	stealth: get(charSheet, "abilities.skills.stealth", 0),
	survival: get(charSheet, "abilities.skills.survival", 0),
	academics: get(charSheet, "abilities.knowledges.academics", 0),
	computer: get(charSheet, "abilities.knowledges.computer", 0),
	finance: get(charSheet, "abilities.knowledges.finance", 0),
	investigation: get(charSheet, "abilities.knowledges.investigation", 0),
	law: get(charSheet, "abilities.knowledges.law", 0),
	medicine: get(charSheet, "abilities.knowledges.medicine", 0),
	occult: get(charSheet, "abilities.knowledges.occult", 0),
	politics: get(charSheet, "abilities.knowledges.politics", 0),
	science: get(charSheet, "abilities.knowledges.science", 0),
	technology: get(charSheet, "abilities.knowledges.technology", 0),
	humanity: get(charSheet, "status.condition.humanityPath", 0),
	willpower: get(charSheet, "status.condition.willpowerStatus", 0),
	conscience: get(charSheet, "advantages.virtues.conscienceConviction", 0),
	courage: get(charSheet, "advantages.virtues.courage", 0),
	selfControl: get(charSheet, "advantages.virtues.selfControl", 0),
	...Object.keys(disciplines)
		.filter((key) => {
			const { _custom = {}, ...charDisciplines } = get(charSheet, "advantages.disciplines.list", []);
			return [...Object.keys(charDisciplines), ...Object.keys(_custom)].includes(key);
		})
		.reduce((acc, key) => ({
			...acc,
			[key]: get(charSheet, `advantages.disciplines.list.${key}`, 0)
		}), {})
});
