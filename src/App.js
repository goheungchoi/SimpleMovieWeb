import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from "./routes/Home.js";
import Detail from "./routes/Detail.js"

function App() {
  return (
  <Router>
    <Switch>
      <Route path="/movie/:id" exact={true} component={Detail} />
      <Route path="/" component={Home} />
    </Switch>
  </Router>
  );
}

export default App;
