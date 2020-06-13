/**
 * Map each value of `obj` through `fn`.
 * Uses `Object.entries` to collect properties.
 */
export function mapObj<T, U = T>(
	/** Input object */
	obj: Record<string, T> | undefined,

	/** Called with each member of the object. */
	fn: (value: T, key: string) => U
): Record<string, U> {
	if (!obj) {
		return {}
	}

	return Object.fromEntries(
		Object.entries(obj ?? {}).map(([key, value]) => [
			key,
			fn(value, key),
		] as const)
	)
}