/**
 * inclusive between
 */
export function intBetween(n: number, min: number, max: number) {
	return Math.min(Math.max(Math.floor(n), min), max)
}