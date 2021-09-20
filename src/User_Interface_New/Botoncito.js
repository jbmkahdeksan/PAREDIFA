import {useContext} from 'react';
import ThemeContext from '../Components/ContextStates';
import ThemeContextTr from '../Components/ContextTransitions';

const Botoncito = () => {
    const {states,setStates} = useContext(ThemeContext);
    const {transitions, setTranstions} = useContext(ThemeContextTr);

    const handleClick = ()=>{
        //........................
        console.log(states)
        console.log(transitions)
        Date.now()
    }
    return ( 
        <button onClick={handleClick}>
                jaja
        </button>
     );
}
 
export default Botoncito;