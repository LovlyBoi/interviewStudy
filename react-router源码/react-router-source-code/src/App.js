import BrowserRouter from './react-router-dom/BrowserRouter';
import { Route, Switch } from './react-router-dom';
import './App.css';
import withRouter from './react-router-dom/withRouter';
import { useEffect } from 'react';

function TestComp(props) {
  console.log("props", props);
  return (<div>TestComp</div>)
}

function Home() {
  console.log("111");
  return (
    <div>我是home页面</div>
  )
}

const TestCompWithRouter = withRouter(TestComp);

function HomeTwo() {
  useEffect(() => {
    console.log("@22")
  }, [])
  return (
    <div>我是Home2页面<TestCompWithRouter /></div>
  )
}

function News() {
  return (
    <div>我是news页面</div>
  )
}

const CommonPage = ({ history }) => (
  <div>
    <button onClick={() => history.push("/home/homeTwo")}>去home页面</button>
    <button onClick={() => history.push("/news")}>去news页面</button>
  </div>
)

function App() {
  return (
    <div onClick={e => {
      console.log(e);
      e.stopPropagation()
    }} className="App">
      {/* <BrowserRouter>
         <Switch>
            <Route path="/home" component={Home} />
            <Route path="/home/homeTwo" component={HomeTwo} />
            <Route path="/news" component={News} />
         </Switch>
         <Route component={CommonPage} />
      </BrowserRouter>
       */}

      <div onClick={() => {console.log("111")}}>button</div>
    </div>
  );
}

export default App;
