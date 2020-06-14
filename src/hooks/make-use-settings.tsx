import React from 'react'

export function makeUseSettings<T>(
	storageKey: string,
	defaultValue: T,
) {
	const read = (): T => {
		return JSON.parse(
			localStorage.getItem(storageKey) ?? JSON.stringify(defaultValue)
		)
	}

	const write = (value?: T) => {
		if (value == null) {
			localStorage.removeItem(storageKey)
			return
		}
		localStorage.setItem(storageKey, JSON.stringify(value))
	}

	const ctx = React.createContext([read(), write] as const)

	const useHook = () => React.useContext(ctx)

	const Provider: React.FC = ({ children }) => {
		const [current, setCurrent] = React.useState(read)
		const value = React.useMemo(
			() => [
				current,
				(next?: T) => {
					write(next)
					setCurrent(next ?? defaultValue)
				}
			] as const,
			[current]
		)

		return (
			<ctx.Provider value={value}>
				{children}
			</ctx.Provider>
		)
	}

	return [useHook, Provider] as const
}