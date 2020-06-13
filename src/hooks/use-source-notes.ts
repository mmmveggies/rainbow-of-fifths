import React from 'react'
import { Input, InputEventNoteon, InputEventNoteoff } from 'webmidi'

export type SourceNotes = Record<string, InputEventNoteon>

export function useSourceNotes(source: Input) {
	const [notes, setNotes] = React.useState<SourceNotes>({})

	React.useEffect(
		() => {
			const onNoteOn = (event: InputEventNoteon) => {
				setNotes((curr) => ({ ...curr, [event.note.number]: event }))
			}
			const onNoteOff = (event: InputEventNoteoff) => {
				setNotes((curr) => {
					const { [event.note.number]: _, ...next } = curr
					return next
				})
			}
			source.addListener('noteon', 'all', onNoteOn)
			source.addListener('noteoff', 'all', onNoteOff)
			return () => {
				source.removeListener('noteon', 'all', onNoteOn)
				source.removeListener('noteoff', 'all', onNoteOff)
			}
		},
		[source],
	)

	return notes
}