import React from 'react'

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface KeyboardKeyProps extends DivProps {
	midi: number
}

export function KeyboardKey(props: KeyboardKeyProps) {
	return (
		<div {...props} />
	)
}