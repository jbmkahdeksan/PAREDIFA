import {BrowserRouter, Route,Switch, Redirect} from 'react-router-dom';
import { useState } from 'react';
import ThemeContext from './Components/Context/ContextStates';
import ThemeContextMsg from './Components/Context/ContextMessage';
import ThemeContextTr from './Components/Context/ContextTransitions';
import ThemeContextMsgInfo from './Components/Context/ContextMsg'
import NavBar from './Components/Navbar/NavBar'
import Body from './Components/Body'
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
  const [msgInfo, setMsgInfo]=useState({bg:'',header:'',body:''});
  return (
    <BrowserRouter>
      <ThemeContextMsg.Provider value={{msgShow, setMsgShow}}>
          <ThemeContextMsgInfo.Provider value={{msgInfo, setMsgInfo}}>
              <ThemeContextTr.Provider value={{transitions, setTranstions}}>
                  <ThemeContext.Provider value={{states, setStates}}>
                      <NavBar/>

                        <Switch>
                            <Route exact path="/" component={Body}/>
                            <Redirect exact to="/" />
                        </Switch>
                    </ThemeContext.Provider>
              </ThemeContextTr.Provider>
            </ThemeContextMsgInfo.Provider>
        </ThemeContextMsg.Provider>
    </BrowserRouter>
  );
}

export default App;
