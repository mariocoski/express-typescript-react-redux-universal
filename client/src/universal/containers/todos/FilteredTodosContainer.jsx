import React, {Component} from 'react';
import TodoList from '../../components/todos/TodoList';
import {addTodo, removeTodo, toggleTodo, setTodosFilter} from '../../redux/modules/todos';
import {connect} from 'react-redux';

class FilteredTodosContainer extends Component {

  getFilteredTodos(){
    return this.props.todos.filter(todo => {

      if(this.props.filter === 'SHOW_COMPLETED'){
        return todo.completed === true;
      }
      
      return true;
    });
  }

   render(){
     const todos = this.getFilteredTodos();
    return (
      <TodoList
          todos={todos}
          add={this.props.add}
          remove={this.props.remove}
          toggle={this.props.toggle}
        >
      </TodoList>
  )
   }
  
}

const connectStateToProps = state => ({
  filter: state.todosFilter,
  todos : state.todos,
});

const connectDispatchToProps = dispatch => ({
  add : (todo) => dispatch(addTodo(todo)),
  remove : (id) => dispatch(removeTodo(id)),
  toggle : (id) => dispatch(toggleTodo(id)),
  changeFilter : (filter) => dispatch(setTodosFilter(filter)),
});

export default connect(connectStateToProps,connectDispatchToProps)(FilteredTodosContainer);