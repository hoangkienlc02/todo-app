import React, { PureComponent } from 'react';
//css
import './App.css';
import './css/todo.css'
//components
import Header from './components/header';
import TodoList from './components/todolist';
import Footer from './components/footer';

const isNotCheckedAll = (todo = []) => todo.find(todo => !todo.isCompleted);

const filterByStatus = (todos = [], status = '', id = '') => {
  switch (status) {
    case 'ACTIVE':
      return todos.filter(todo => !todo.isCompleted);
    case 'COMPLETED':
      return todos.filter(todo => todo.isCompleted);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== id);
    default:
      return todos;
  }
}

class App extends PureComponent {
  state = {
    todosList:[],
    todoEditingId: '',
    isCheckedAll: false, // Cập nhật giá trị mặc định
    status: 'ALL'
  }

  componentWillMount(prevProps, prevState) {
      this.setState({
        isCheckedAll: !isNotCheckedAll(this.state.todosList)
      });
  }

  addTodo = (todo = {}) => {
    this.setState(prevState => ({
      todosList: [...prevState.todosList, todo]
    }));
  }

  removeTodo = (id = '') => {
    const { todosList } = this.state
    this.setState({
      todosList: filterByStatus(todosList, 'REMOVE', id)
    })
  }

  getTodoEditingId = (id = '') => {
    this.setState({ todoEditingId: id });
  }

  onEditTodo = (todo = {}, index = -1) => {
    if (index >= 0) {
      const { todosList: list } = this.state;
      list.splice(index, 1, todo);
      this.setState({
        todosList: list,
        todoEditingId: ''
      });
    }
  }

  markCompleted = (id = '') => {
    const { todosList } = this.state;
    const updatedList = todosList.map(todo => todo.id === id ? ({ ...todo, isCompleted: !todo.isCompleted }) : todo);
    this.setState({
      todosList: updatedList,
      isCheckedAll: !isNotCheckedAll(updatedList)
    });
  }

  checkAllTodos = () => {
    const { todosList, isCheckedAll } = this.state
    this.setState(preState => ({
      todosList: todosList.map(todo => ({ ...todo, isCompleted: !isCheckedAll })),
      isCheckedAll: !preState.isCheckedAll
    }))
  }

  setStatusFilter = (status = '') => {
    this.setState({
      status
    })
  }

  clearCompleted = () => {
    const { todosList } = this.state
    this.setState({
      todosList: filterByStatus(todosList, 'ACTIVE')
    })
  }

  render() {
    const { todosList, todoEditingId, isCheckedAll, status } = this.state;
    return (
      <div className="App">
        <Header addTodo={this.addTodo} isCheckedAll={isCheckedAll} />
        <TodoList 
          todosList={filterByStatus(todosList, status)} 
          isCheckedAll={isCheckedAll}
          markCompleted={this.markCompleted}
          getTodoEditingId={this.getTodoEditingId} 
          todoEditingId={todoEditingId} 
          onEditTodo={this.onEditTodo}
          checkAllTodos={this.checkAllTodos}
          removeTodo={this.removeTodo}
        />
        <Footer 
          setStatusFilter={this.setStatusFilter} status={status} clearCompleted={this.clearCompleted}/>
      </div>
    );
  }
}

export default App;
