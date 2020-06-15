import React from 'react'
import { Input, Typography, Button, Popconfirm } from 'antd'
import { Midi } from '@tonaljs/tonal'
import { useSizes } from '../hooks'

const names = Array.from({ length: 12 }, (_, i) => {
	return Array.from(
		new Set([
			Midi.midiToNoteName(i, { pitchClass: true }),
			Midi.midiToNoteName(i, { pitchClass: true, sharps: true }),
		])
	).join(' / ')
})

export function InputSizes() {
	const [sizes, setSizes] = useSizes()

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
				onConfirm={() => setSizes(undefined)}
				title='Reset to default sizes?'
			>
				<Button block>
					Reset Sizes
				</Button>
			</Popconfirm>
			{Array.from({ length: 12 }, (_, i) => (
				<Input
					key={i}
					min={0}
					max={30}
					type='number'
					size='large'
					value={sizes[i]}
					onChange={({ target: { value } }) => {
						if (value === '') {
							return
						}
						const next = sizes.slice()
						next[i] = +value
						setSizes(next)
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