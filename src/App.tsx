import React from 'react';
import { KeyboardSource } from './components';
import { useSources } from './hooks';
import { Card, Divider } from 'antd';

export default function App() {
  const sources = useSources()

  return (
    <>
      <h1>Sources</h1>
      {sources.map((source) => (
        <Card
          key={source.id}
          title={(
            <>
              <h3>
                {source.name}
                <Divider type='vertical' />
                {source.manufacturer}
                <Divider type='vertical' />
                {source.id}
              </h3>
            </>
          )}
        >
          <KeyboardSource
            source={source}
            svgProps={{ width: '100%' }}
          />
        </Card>
      ))}
    </>
  );
}
