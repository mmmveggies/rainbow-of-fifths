
export interface DonutSegmentsConfig {
	/** center point X coordinate */
	cX: number

	/** center point Y coordinate */
	cY: number

	/** outer radius length */
	r0: number

	/** inner radius length */
	r1: number

	/** number of donut segments */
	length?: number

	/** rotation of donut */
	theta?: number
}

export function getDonutSegments({
	cX,
	cY,
	r0,
	r1,
	length = 12,
	theta = Math.PI / length
}: DonutSegmentsConfig) {
	const k = 2 * Math.PI / length

	const points = Array.from({ length }, (_, n) => ({
		x0: cX + r0 * Math.sin(theta + k * n),
		y0: cY + r0 * Math.cos(theta + k * n),
		x1: cX + r0 * Math.sin(theta + k * (n + 1)),
		y1: cY + r0 * Math.cos(theta + k * (n + 1)),
		x2: cX + r1 * Math.sin(theta + k * (n + 1)),
		y2: cY + r1 * Math.cos(theta + k * (n + 1)),
		x3: cX + r1 * Math.sin(theta + k * n),
		y3: cY + r1 * Math.cos(theta + k * n),
	}))

	const paths = points.map((v) => [
		`M ${v.x0} ${v.y0}`,
		`A ${r0} ${r0} 0 0 0 ${v.x1} ${v.y1}`,
		`L ${v.x2} ${v.y2}`,
		`A ${r1} ${r1} 0 0 1 ${v.x3} ${v.y3}`,
		`Z`
	].join('\n'))

	return { points, paths }
}