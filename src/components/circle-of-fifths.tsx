import React from 'react'
import { Midi, Note } from '@tonaljs/tonal'

const NUM_SEGMENTS = 12
const SIZE = 400
const UNIT = 2 * Math.PI / NUM_SEGMENTS
const R = SIZE / 2 * (3 / 4)

export interface CircleOfFifthsProps {
	svgProps?: React.SVGProps<SVGSVGElement>
}

export function CircleOfFifths({
	svgProps
}: CircleOfFifthsProps) {

	return (
		<svg {...svgProps} viewBox={`0 0 ${SIZE} ${SIZE}`}>
			<g stroke='black' fill='black' strokeWidth='2'>
				{Array.from({ length: NUM_SEGMENTS }, (_, i) => {
					const d = [
						`M ${SIZE / 2} ${SIZE / 2}`,
						`m ${R * Math.sin(UNIT * i)} ${R * Math.cos(UNIT * i)}`,
						`a 10 10 0 0 0 10 10`,
						`l 20 20`
					].join('\n')
					return (
						<path key={i} d={d} />
					)
				})}
			</g>
		</svg>
	)
}
