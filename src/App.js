import Main from './Components/Main'
import {BrowserRouter, Route,Switch} from 'react-router-dom';
/*
* 
* Description:
*   Handles routing
* Authors:
*   Andres Alvarez Duran, ID: 117520958
*   Joaquin Barrientos Monge, ID: 117440348
*   Oscar Ortiz Chavarria, ID: 208260347
*   David Zarate Marin, ID: 116770797
*   Group: 01
*   Schedule: 10am 
* 
*/
function App() {
  return (
    <BrowserRouter>
      <Switch>
           <Route path='/' exact component={Main}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
