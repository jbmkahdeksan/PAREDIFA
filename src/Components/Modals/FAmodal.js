import TodosModal from './TodosModal';
import Message from '../Message/Message';
import {useContext} from 'react';
import ThemeContextMsg from '../Context/ContextMessage';
import ThemeContextMsgInfo from '../Context/ContextMsg'

/*
 *
 * Description:
 * Dfa stored in the database
 * Authors:
 *   Andres Alvarez Duran, ID: 117520958
 *   Joaquin Barrientos Monge, ID: 117440348
 *   Oscar Ortiz Chavarria, ID: 208260347
 *   David Zarate Marin, ID: 116770797
 *   Group: 01
 *   Schedule: 10am
 *
 */
const FAmodal = (props) => {
    const handleDoubleClick=()=>{
        props.handleShowFA();
        setMsgShow(true)
        setMsgInfo({bg:'info',header:'Success!',body:'Well it works!'});
    }

    const {msgShow, setMsgShow} = useContext(ThemeContextMsg);
    const {msgInfo, setMsgInfo} = useContext(ThemeContextMsgInfo);
    return (
        <>
        
            <TodosModal  
                handleShow={props.handleShowFA}  
                show={props.viewFA} 
                FaM={true}
                handleDoubleClick={handleDoubleClick}
                title='DFA stored in the DB'
             />
            <Message />
        </>
      );
}
 
export default FAmodal;