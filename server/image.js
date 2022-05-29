import * as m from "./mongo";

const getContentType = (image) => {
	switch (image.charAt(0)) {
	case "/":
		return "image/jpeg";
	case "i":
		return "image/png";
	default:
		return null;
	}
}

export default async (req, res) => {
	// req is the Node.js http request object
	const id = req.url.replace(/^\//, "");

	if (id) {
		const image = await m.characters.getAvatar({ id });

		const parsedImage = Buffer.from(image, "base64");

		const contentType = getContentType(image);

		if (parsedImage && contentType) {
			res.setHeader("Content-Type", contentType);
			res.setHeader("Content-Length", parsedImage.length);
			return res.end(parsedImage);
		}
	}

	res.end("HELLO");
}
