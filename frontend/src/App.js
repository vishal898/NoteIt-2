import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import Create from './pages/Create/Create';
import Home from './pages/Home/Home';
import Anki from './pages/Anki/Anki';
import FilterTopic from './pages/FilterTopic/FilterTopic';
import User from './pages/User/user';
import Glogin from './pages/Glogin/Glogin'


const App=()=> {
  return (
    <>
    
    <Switch>
    <Route exact path="/">
      <Glogin/>
      </Route>  
      
    <Route exact path="/home">
      <Home />
    </Route>

    <Route exact path="/anki">
      <Anki />
    </Route>

    <Route exact path="/topic">
      <FilterTopic />
    </Route>

    <Route exact path="/create">
      <Create/>
    </Route>
    <Route exact path="/user">
     <User/>
    </Route>
  </Switch>
  </>
  );
}



export default App;
