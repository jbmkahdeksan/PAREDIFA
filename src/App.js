import Main from './Components/Main'
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import { useState } from 'react';
import ThemeContext from './Components/Context';
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

  const [states,setStates]=useState([]);
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{states,setStates}}>
          <Switch>
              <Route path='/' exact component={Main}/>
          </Switch>
        </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
