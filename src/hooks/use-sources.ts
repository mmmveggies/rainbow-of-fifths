import React from 'react'
import WebMidi, { WebMidiEventConnected, WebMidiEventDisconnected } from 'webmidi'

export function useSources() {
	const [sources, setSources] = React.useState(WebMidi.inputs)

	React.useEffect(
		() => {
			const onConnected = ({ port }: WebMidiEventConnected) => {
				if (port.type === 'input') {
					setSources((curr) => {
						const next = curr.filter((source) => source.id !== port.id)
						return [...next, port]
					})
				}
			}
			const onDisconnected = ({ port }: WebMidiEventDisconnected) => {
				setSources((curr) => {
					const removed = curr.filter((source) => source.id !== port.id)
					return curr.length === removed.length ? curr : removed
				})
			}
			WebMidi.addListener('connected', onConnected)
			WebMidi.addListener('disconnected', onDisconnected)
			return () => {
				WebMidi.removeListener('connected', onConnected)
				WebMidi.removeListener('disconnected', onDisconnected)
			}
		},
		[],
	)

	return sources
}