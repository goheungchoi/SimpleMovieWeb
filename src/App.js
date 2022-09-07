import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from "./routes/Home.js";
import About from "./routes/About.js";
import Contact from "./routes/Contact.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about/" component={About} />
        <Route path="/contact/" component={Contact} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
