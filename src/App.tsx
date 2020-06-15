import React from 'react';
import { useSources, ProvideShared } from './hooks';
import { Card, Divider, Alert, Row, Col } from 'antd';
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
      <Row align='middle' gutter={8}>
        <Col>
          <h1>Rainbow of Fifths</h1>
        </Col>
        <Col>
          <a href="https://github.com/mmmveggies/rainbow-of-fifths">view source or give feedback on GitHub</a>
        </Col>
      </Row>
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
