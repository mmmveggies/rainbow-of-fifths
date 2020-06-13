import React from 'react'
import { Input } from 'webmidi';
import { useSourceNotes } from '../hooks';
import { Keyboard, KeyboardProps } from './keyboard';

export interface KeyboardSourceProps extends KeyboardProps {
	source: Input
}

export function KeyboardSource({
	source,
	...rest
}: KeyboardSourceProps) {
	const notes = useSourceNotes(source)

	const keyProps = Object.fromEntries(
		Object.entries(notes).map(([midi, event]) => [
			midi,
			{
				fill: 'blue'
			} as React.SVGProps<SVGRectElement>
		] as const)
	)

	return (
		<Keyboard
			{...rest}
			keyProps={keyProps}
		/>
	)
}