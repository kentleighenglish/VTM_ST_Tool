import Section from "./Section";
import SectionColumn from "./SectionColumn"

const types = {
	section: Section,
	sectionColumn: SectionColumn
}

export const generateFields = (h, fields) => {
	return Object.keys(fields).reduce((acc, key) => {
		const field = fields[key];

		if (types[field.type]) {
			const component = types[field.type];

			acc.push(h(component, { props: { name: key, ...field } }, []))
		} else {
			// eslint-disable-next-line no-console
			console.error(`Cannot find type for ${field.type}`);
		}

		return acc;
	}, []);
}

export default {}
