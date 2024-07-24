import React, { memo } from 'react';
import Todo from './todo';

const TodoList = memo(props => {
    const { todosList, isCheckedAll, checkAllTodos } = props;
    return (
        <section className='main'>
            <label htmlFor="toggle-all" onClick={checkAllTodos}><p>Chọn tất cả</p></label>
            <input className="toggle-all" type="checkbox" checked={isCheckedAll} onClick={checkAllTodos} />
            <ul className='todo-list'>
                {
                    todosList.map((todo, index) => <Todo key={`todo${todo.id}`} {...{ todo }} {...props} index={index} />)
                }
            </ul>
        </section>
    );
});

export default TodoList;
