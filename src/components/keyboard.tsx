import React from 'react'
import { Midi, Note } from '@tonaljs/tonal'

// Thanks to https://en.wikipedia.org/wiki/User:Lanttuloora for measurements
// taken from https://commons.wikimedia.org/wiki/File:PianoKeyboard.svg

const WIDTH_WHITE = 23
const WIDTH_BLACK = 13
const HEIGHT_WHITE = 120
const HEIGHT_BLACK = 80
const OFFSET_BLACK: Record<number, number> = {
	1: -6 - (2 / 3),
	3: -4 - (1 / 3),
	6: -9.75,
	8: -6.75,
	10: -3.25,
}

const isAccidental = (chroma: number) => (
	[1, 3, 6, 8, 10].includes(chroma)
)

/** will throw on invalid midi value */
const isAccidentalMidi = (midi: number) => (
	isAccidental(Note.chroma(Midi.midiToNoteName(midi))!)
)

/** inclusive between */
const intBetween = (n: number, min: number, max: number) => (
	Math.min(Math.max(Math.floor(n), min), max)
)

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
	keyProps?: Record<string, React.SVGProps<SVGRectElement>>

	svgProps?: React.SVGProps<SVGSVGElement>
}


export function Keyboard({
	low = 21,
	high = 109,
	keyProps,
	svgProps,
}: KeyboardProps) {

	const start = intBetween(low, 21, 109)
	const end = intBetween(high, 21, 109)
	const length = Math.max(0, end - start)

	// pad out the with white notes to
	// ensure framing is an even rectagle
	const [whiteKeys, blackKeys] = React.useMemo(
		() => {
			const midis = Array.from({ length }, (_, index) => (
				start + index
			))

			const head = midis[0]
			const last = midis[midis.length - 1]

			if (isAccidentalMidi(head)) {
				midis.unshift(head - 1)
			}
			if (isAccidentalMidi(last)) {
				midis.push(last + 1)
			}

			const notes = midis.map((midi, i) => {
				const skips = midis.slice(0, i).filter(isAccidentalMidi).length
				const offset = skips * WIDTH_WHITE

				const note = Midi.midiToNoteName(midi)
				const chroma = Note.chroma(note)!
				const accidental = isAccidental(chroma)

				return {
					midi,
					offset,
					accidental,
					rect: {
						key: midi,
						x: (i * WIDTH_WHITE - offset) + (accidental ? OFFSET_BLACK[chroma] : 0),
						width: accidental ? WIDTH_BLACK : WIDTH_WHITE,
						height: accidental ? HEIGHT_BLACK : HEIGHT_WHITE,
					}
				}
			})

			return [
				notes.filter((note) => !note.accidental),
				notes.filter((note) => note.accidental)
			]
		},
		[start, length]
	)

	if (!length) {
		return (<h1>No keys in midi range: [{low},{high}]</h1>)
	}

	return (
		<svg {...svgProps} viewBox={`0 0 ${WIDTH_WHITE * whiteKeys.length} ${HEIGHT_WHITE}`}>

			<g fill='white' stroke='black'>
				{whiteKeys.map((note, i) => (
					<rect
						{...note.rect}
						{...keyProps?.[note.midi]}
					/>
				))}
			</g>

			<g fill='black' fontSize={12} textAnchor='middle'>
				{whiteKeys.map((note, i) => (
					<text
						key={note.midi}
						x={(i * WIDTH_WHITE) + (WIDTH_WHITE / 2)}
						y={HEIGHT_WHITE - 10}
					>
						{Midi.midiToNoteName(note.midi, { sharps: true, })}
					</text>
				))}
			</g>

			<g fill='black' stroke='black'>
				{blackKeys.map((note, i) => (
					<rect
						stroke="black"
						{...note.rect}
						{...keyProps?.[note.midi]}
					/>
				))}
			</g>
		</svg>
	)
}