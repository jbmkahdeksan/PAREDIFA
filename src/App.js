import Main from './Components/Main'
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import { useState } from 'react';
import ThemeContext from './Components/ContextStates';
import ThemeContextMsg from './Components/ContextMessage';
import ThemeContextTr from './Components/ContextTransitions';
import NavBar from './User_Interface_New/NavBar'
import Body from './User_Interface_New/Body'
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
  const [transitions,setTranstions]=useState([]);
  const [msgShow, setMsgShow]= useState(false);
  return (
    <BrowserRouter>
    <ThemeContextMsg.Provider value={{msgShow, setMsgShow}}>
      <ThemeContextTr.Provider value={{transitions, setTranstions}}>
          <ThemeContext.Provider value={{states, setStates}}>
            <NavBar/>
              <Switch>
                  <Route exact path="/" component={Body}/>
                
              </Switch>
            </ThemeContext.Provider>
      </ThemeContextTr.Provider>
      </ThemeContextMsg.Provider>
    </BrowserRouter>
  );
}

export default App;
