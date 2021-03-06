import React from 'react'
import { Input, Typography, Button, Popconfirm } from 'antd'
import { Midi } from '@tonaljs/tonal'
import { useColors } from '../hooks'

const names = Array.from({ length: 12 }, (_, i) => {
	return Array.from(
		new Set([
			Midi.midiToNoteName(i, { pitchClass: true }),
			Midi.midiToNoteName(i, { pitchClass: true, sharps: true }),
		])
	).join(' / ')
})

export function InputColors() {
	const [colors, setColors] = useColors()

	return (
		<div
			style={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-evenly'
			}}
		>
			<Popconfirm
				onConfirm={() => setColors(undefined)}
				title='Reset to default colors?'
			>
				<Button block>
					Reset Colors
				</Button>
			</Popconfirm>
			{Array.from({ length: 12 }, (_, i) => (
				<Input
					key={i}
					type='color'
					size='large'
					value={colors[i]}
					onChange={(event) => {
						const next = colors.slice()
						next[i] = event.currentTarget.value
						setColors(next)
					}}
					addonAfter={(
						<Typography.Text strong>
							{names[i]}
						</Typography.Text>
					)}
				/>
			))}
		</div>
	)
}