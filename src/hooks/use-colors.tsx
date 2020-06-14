import { makeUseSettings } from './make-use-settings'

const KEY = 'colors'

//http://www.creativecolorschemes.com/resources/free-color-schemes/common-color-scheme.shtml#:~:text=The%20Common%20scheme%20primary%20contains,green%20are%20added%20for%20variety.
const defaultColors = [
	'#002685',
	'#449ADF',
	'#4DC7FD',
	'#4CDE77',
	'#5E53C7',
	'#7E77D2',
	'#CD1E10',
	'#FC007F',
	'#FE79D1',
	'#763931',
	'#F1AB00',
	'#FADF00',
]

export const [useColors, ProvideColors] = makeUseSettings(
	KEY,
	defaultColors,
)