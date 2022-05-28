
export default (input = "") => input.replace(/([A-z])([a-z]+)([-_\s$])?/g, (txt, g1, g2, g) => g1.toUpperCase() + g2 + " ").trim()
