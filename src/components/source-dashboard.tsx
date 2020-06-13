import React from 'react'
import { Input } from 'webmidi';
import { useSourceNotes } from '../hooks';
import { Keyboard, KeyboardProps } from './keyboard';
import { mapObj } from '../utils';
import { KeyboardSource } from './keyboard-source';
import { Row, Col } from 'antd';
import { CircleOfFifths } from './circle-of-fifths';

export interface SourceDashboardProps {
	source: Input
}

export function SourceDashboard({
	source,
}: SourceDashboardProps) {
	const notes = useSourceNotes(source)

	const keyProps = mapObj(notes, (event): React.SVGProps<SVGRectElement> => ({
		fill: 'blue'
	}))

	return (
		<>
			<Row>
				<Col span={12}>
					<CircleOfFifths
						svgProps={{ width: '100%' }}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={24}>
					<Keyboard
						svgProps={{ width: '100%' }}
						keyProps={keyProps}
					/>
				</Col>
			</Row>
		</>
	)
}