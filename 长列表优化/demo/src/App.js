import './App.css';
import RecycleScroller from './src/components/RecycleScroller';
import ListItem from './src/components/ListItem';
import { useCallback } from 'react';

const data = [];
for(let i = 0; i < 50000; i ++) {
  data.push({
    title: i,
    desc: Math.random().toLocaleString(),
    id: i
  })
}

function App() {
  const renderChild = useCallback((item) => {
    return <ListItem item={item} />
  }, [])
  return (
    <div className="App">
        <RecycleScroller
          data={ data }
          render={renderChild}
          containerHeight='500'>
        </RecycleScroller>
    </div>
  );
}

export default App;
