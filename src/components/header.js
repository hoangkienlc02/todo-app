import React, { memo, useState } from 'react';

const Header = memo((props) => {
    const [text, setText] = useState('')
    const { addTodo } = props
    const onAddTodo = (e = {}) => {
        if(e.key === 'Enter' && text){
            // console.log('Text', text);
            addTodo({
                id: new Date().valueOf(),
                text,
                isCompleted: false
            })
            setText('');  // Đặt lại trạng thái text
        }
    }
    return (
        <header className="header">
            <h1>QUẢN LÍ CÔNG VIỆC</h1>
            <input
                className="new-todo form-control"
                value={text} 
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => onAddTodo(e)}
                placeholder="Thêm công việc"
                autoFocus/>
        </header>
    )
})

export default Header