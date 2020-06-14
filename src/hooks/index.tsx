import React from 'react'
import { ProvideSizes } from './use-sizes'
import { ProvideColors } from './use-colors'

export * from './use-sources'
export * from './use-source-notes'
export * from './use-colors'
export * from './use-sizes'

export function ProvideShared({ children }: React.Props<{}>) {
	return (
		<ProvideSizes>
			<ProvideColors>
				{children}
			</ProvideColors>
		</ProvideSizes>
	)
}