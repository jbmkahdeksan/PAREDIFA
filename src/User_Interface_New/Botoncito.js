import { useContext } from 'react';
import ThemeContext from '../Components/ContextStates';
import ThemeContextTr from '../Components/ContextTransitions';

const Botoncito = () => {
    const { states, setStates } = useContext(ThemeContext);
    const { transitions, setTranstions } = useContext(ThemeContextTr);

    const handleClick = () => {
        //........................
        console.log(states)
        console.log(transitions)
        Date.now()
    }
    return (
        <div>
            <input type="text" id="input-word"></input>
            <input id="run-button" type="submit" class="button" value="Run" onclick={handleClick}></input>
        </div>
    );
}

export default Botoncito;