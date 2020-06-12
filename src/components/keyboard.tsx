import React from 'react'

const WIDTH_WHITE = 23
const WIDTH_BLACK = 13
const HEIGHT_WHITE = 120
const HEIGHT_BLACK = 80

/** inclusive between */
function intBetween(n: number, min: number, max: number) {
	return Math.min(Math.max(Math.floor(n), min), max)
}

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export interface KeyboardKeyProps extends DivProps {
	midi: number
}


export interface KeyboardProps {
	/**
	 * Lowest key on the keyboard. Must be >= 0.
	 * @default 21 // (aka A0)
	 */
	low?: number

	/**
	 * Highest key on the keyboard. Must be <= 127.
	 * @default 108 // (aka C8)
	 */
	high?: number

	/**
	 * 
	 */
	keyProps?: Record<string, KeyboardKeyProps>
}


export function Keyboard({
	low = 21,
	high = 108,
	keyProps
}: KeyboardProps) {

	const start = intBetween(low, 21, 107)
	const end = intBetween(high, 21, 107)
	const length = Math.max(0, end - start)

	// pad out the with white notes to
	// ensure framing is an even rectagle
	const notes = React.useMemo(
		() => {
			const range = Array.from({ length }, (_, i) => {
				const midi = start + i
				const octave = Math.floor((midi - 9) / 12)
				const position = midi - (octave * 12)
				const accidental = [1, 3, 6, 8, 10].includes(position)
				return {
					midi,
					octave,
					position,
					accidental,
				}
			})
			const first = range[0]
			const last = range[range.length - 1]
			if (first.accidental) {
				range.unshift({
					midi: first.midi - 1,
					octave: first.position === 0 ? first.octave - 1 : first.octave,
					position: first.position === 0 ? 11 : first.position - 1,
					accidental: false,
				})
			}
			if (last.accidental) {
				range.push({
					midi: first.midi + 1,
					octave: first.position === 11 ? first.octave + 1 : first.octave,
					position: first.position === 11 ? 0 : first.position + 1,
					accidental: false,
				})
			}
			return range
		},
		[start, length]
	)

	const width = React.useMemo(
		() => HEIGHT_WHITE * notes.filter((note) => !note.accidental).length,
		[notes]
	)


	if (!length) {
		return (<h1>No keys in midi range: [{low},{high}]</h1>)
	}

	return (
		<svg viewBox={`0 0 ${width} ${HEIGHT_WHITE}`}>
			{notes.map((note, i) => {
				const extra = keyProps?.[note.midi]
				return (
					<rect
						stroke="black"
						fill={note.accidental ? 'black' : 'white'}
						key={note.midi}
					/>
				)
			})}
		</svg>
	)
}