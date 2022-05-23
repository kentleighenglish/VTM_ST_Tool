<script>
import mdParser from "@deskeen/markdown";

export default {
	name: "CommonMarkdown",
	methods: {
		parse (content = "") {
			content = content.replace(/(\s|\n|^)((www\.|http:\/\/|https:\/\/)+[^\s]+[\w])(\s|\n|$)/gm, (match, g1, g2, g3, g4) => {
				const prefix = (g1 === "\n" || g1 === " ") ? g1 : "";
				const suffix = (g4 === "\n" || g4 === " ") ? g4 : "";

				return `${prefix}[${g2}](${g2})${suffix}`;
			});

			const parsed = mdParser.parse(content, {
				allowHeader: false,
				allowImage: false,
				allowMultilineCode: true,
				allowUnorderedList: true,
				allowUnorderedNestedList: true,
				allowOrderedList: true,
				allowOrderedNestedList: true,
				allowHorizontalLine: true,
				allowHTMLAttributes: true,
				allowFootnote: true
			});

			return parsed.innerHTML;
		}
	},
	render (h) {
		const content = (this.$slots.default[0]?.text).trim();

		const parsed = this.parse(content);

		return h("span", { class: "markdown", domProps: { innerHTML: parsed } });
	}
}
</script>
