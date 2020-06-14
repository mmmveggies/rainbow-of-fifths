import { makeUseSettings } from './make-use-settings'

const KEY = 'sizes'

const defaultSizes = [
	24,
	4,
	12,
	4,
	12,
	16,
	4,
	20,
	4,
	16,
	4,
	16
]

export const [useSizes, ProvideSizes] = makeUseSettings(
	KEY,
	defaultSizes,
)