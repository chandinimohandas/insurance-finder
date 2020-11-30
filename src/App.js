import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Policies from './components/pages/Policies';
import Charts from './components/pages/Charts';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/policies' component={Policies} />
          <Route exact path='/charts' component={Charts} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
