import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Create from './pages/Create/Create';
import Home from './pages/Home/Home';
import Anki from './pages/Anki/Anki';
import FilterTopic from './pages/FilterTopic/FilterTopic';


const App=()=> {
  return (
    <Router>
    <Navbar/>
    <main>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route> 
        <Route path="/Anki" exact>
          <Anki/>
        </Route>
        <Route path="/Topic" exact>
          <FilterTopic/>
        </Route>
        <Route path="/Create" exact>
          <Create/>
        </Route>
        <Redirect to="/" />
      </Switch>
    </main>
   </Router>
  );
}



export default App;
