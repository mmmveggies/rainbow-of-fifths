import React from 'react';
import { useSources, ProvideShared } from './hooks';
import { Card, Divider, Alert } from 'antd';
import { SourceDashboard } from './components/source-dashboard';

const empty = (
  <Alert
    type='warning'
    message='Please connect a midi input device'
  />
)

export default function App() {
  const sources = useSources()

  return (
    <ProvideShared>
      <h1>Rainbow of Fifths</h1>
      {sources.length ? sources.map((source) => (
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
          <SourceDashboard source={source} />
        </Card>
      )) : empty}
    </ProvideShared>
  );
}
