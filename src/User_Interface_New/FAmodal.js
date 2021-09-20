import TodosModal from './TodosModal';
import Message from './Message';
import {useContext} from 'react';
import ThemeContextMsg from '../Components/ContextMessage';
import ThemeContextMsgInfo from './ContextMsg'
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
                title={'FA stored in the DB'}
             />
            <Message />
        </>
      );
}
 
export default FAmodal;