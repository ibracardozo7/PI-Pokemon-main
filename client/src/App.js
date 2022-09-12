import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from './components/Home/Home';
import PokemonCreate from "./components/PokemonCreate"
import PokemonDetail from "./components/PokemonDetail/PokemonDetail"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/pokemon" component={PokemonCreate} />
          <Route exact path="/pokemon/:id" component={PokemonDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
