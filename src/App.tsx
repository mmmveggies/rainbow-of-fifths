import React from 'react';
import { useSources, colorsCtx, colorsRead, colorsWrite } from './hooks';
import { Card, Divider } from 'antd';
import { SourceDashboard } from './components/source-dashboard';

export default function App() {
  const sources = useSources()

  const [current, setCurrent] = React.useState(colorsRead)
  const value = React.useMemo(
    () => [
      current,
      (next: string[]) => {
        colorsWrite(next)
        setCurrent(next)
      }
    ] as const,
    [current]
  )

  return (
    <colorsCtx.Provider value={value}>
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
          <SourceDashboard source={source} />
        </Card>
      ))}
    </colorsCtx.Provider>
  );
}
