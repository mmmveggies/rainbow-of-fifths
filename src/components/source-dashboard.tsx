import React from 'react'
import { Input } from 'webmidi';
import { useSourceNotes, useColors } from '../hooks';
import { Keyboard, KeyboardProps } from './keyboard';
import { mapObj } from '../utils';
import { KeyboardSource } from './keyboard-source';
import { Row, Col } from 'antd';
import { CircleOfFifths } from './circle-of-fifths';
import { ColorSelector } from './color-selector';
import { Midi, Note, Scale } from '@tonaljs/tonal';

export interface SourceDashboardProps {
	source: Input
}

export function SourceDashboard({
	source,
}: SourceDashboardProps) {
	const notes = useSourceNotes(source)
	const [colors] = useColors()

	const pressed = new Set(
		Object.keys(notes).map((midi) => (
			Midi.midiToNoteName(+midi, { pitchClass: true })
		))
	)

	const keyProps = mapObj(notes, (event): React.SVGProps<SVGRectElement> => ({
		fill: event.note.number in notes ? colors[Note.chroma(Midi.midiToNoteName(event.note.number)!)!] : undefined
	}))

	const pathProps = Array.from({ length: 12 }, (_, i) => {
		const tonic = (i + 7) % 12
		const name = Midi.midiToNoteName(tonic, { pitchClass: true })!
		// const scale = Scale.get([name, 'major'])
		return Array.from({ length: 12 }, (_, j) => {
			const midi = (j + tonic) % 12
			const note = Midi.midiToNoteName(midi, { pitchClass: true })
			return {
				name,
				midi,
				note,
				fill: pressed.has(note) ? colors[midi % 12] : undefined
			}
		})
	})


	return (
		<>
			<Row>
				<Col span={12}>
					<CircleOfFifths
						svgProps={{ width: '100%' }}
						pathProps={pathProps}
					/>
				</Col>
				<Col span={12}>
					<ColorSelector />
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Keyboard
						svgProps={{ width: '100%' }}
						keyProps={keyProps}
					/>
				</Col>
			</Row>
		</>
	)
}