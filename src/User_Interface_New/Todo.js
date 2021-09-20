import TodosModal from './TodosModal'
import Badge from 'react-bootstrap/Badge'
import {useState} from 'react'
const Todo = () => {
    const [viewTodos,setViewTodos]=useState(false);

    const handleShowTodos=()=>setViewTodos(!viewTodos);
    return ( 
    <>                    
           <Badge  onClick={handleShowTodos}bg="danger" className="todos" title="Todos of FA">9</Badge>{' '}
           <TodosModal  handleShow={handleShowTodos}  show={viewTodos}/>
    </> );
}
 
export default Todo;