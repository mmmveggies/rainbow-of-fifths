import React from 'react'
import { Midi, Note } from '@tonaljs/tonal'
import { getDonutSegments } from '../utils'
import { useSizes } from '../hooks'

const CHROMA = 12

const sum = (arr: number[]) => arr.reduce((sum, n) => sum + n, 0)

export interface CircleOfFifthsProps {
	svgProps?: React.SVGProps<SVGSVGElement>
	pathProps?: React.SVGProps<SVGPathElement>[][]
}

export function CircleOfFifths({
	svgProps,
	pathProps,
}: CircleOfFifthsProps) {
	const [sizes] = useSizes()

	const center = sum(sizes)
	const size = center * 2

	const donuts = React.useMemo(
		() => {
			return Array.from({ length: CHROMA }, (_, i) => {
				const r0 = center - sum(sizes.slice(0, i))
				const r1 = center - sum(sizes.slice(0, i + 1))
				return getDonutSegments({
					cX: center,
					cY: center,
					r0,
					r1,
				})
			})
		},
		[center, sizes],
	)



	return (
		<svg {...svgProps} viewBox={`0 0 ${size} ${size}`}>
			<g stroke='black' fill='white' strokeWidth='0.1'>
				{donuts.map(({ paths }, i) => (
					<g key={i}>
						{paths.map((d, j) => {
							// props are ordered spiralling clockwise
							// and inwards from 12 oclock
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
