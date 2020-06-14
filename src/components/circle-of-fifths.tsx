import React from 'react'
import { Midi, Note } from '@tonaljs/tonal'
import { getDonutSegments } from '../utils'

const CHROMA = 12

export interface CircleOfFifthsProps {
	size?: number
	svgProps?: React.SVGProps<SVGSVGElement>
	pathProps?: React.SVGProps<SVGPathElement>[][]
}

export function CircleOfFifths({
	size = 400,
	svgProps,
	pathProps,
}: CircleOfFifthsProps) {
	const donuts = React.useMemo(
		() => {
			const scale = (x: number) => (
				size / 2 * (CHROMA - x) / CHROMA
			)

			return Array.from({ length: CHROMA }, (_, i) => (
				getDonutSegments({
					cX: size / 2,
					cY: size / 2,
					r0: scale(i),
					r1: scale(i + 1),
				})
			))
		},
		[size],
	)

	return (
		<svg {...svgProps} viewBox={`0 0 ${size} ${size}`}>
			<g stroke='black' fill='white' strokeWidth='0.5'>
				{donuts.map(({ paths }, i) => (
					<g key={i}>
						{paths.map((d, j) => {
							// props are passed in radially
							// spiralling inwards from 12 oclock
							const scaleIndex = (j * 5) % 12
							const degreeIndex = (i + 4) % 12
							const props = pathProps?.[scaleIndex]?.[degreeIndex]
							return (
								<path
									key={j}
									{...props}
									d={d}
								/>
							)
						})}
					</g>
				))}
			</g>
		</svg>
	)
}
