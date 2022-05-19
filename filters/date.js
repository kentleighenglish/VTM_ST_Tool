import moment from "moment-timezone";

const defaultFormat = "DD/MM/YYYY HH:ss"

export default (date, format = defaultFormat, displayCountdown = false) => {
	if (!date) {
		console.error("No date provided for date filter");
		return "";
	}
	// console.log(date);
	const d = moment.tz(date, "Europe/London");

	return d.format(format);
}
