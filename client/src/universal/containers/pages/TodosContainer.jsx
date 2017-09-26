import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import TodoList from '../../components/todos/TodoList';
import {addTodo, removeTodo,completeTodo, setTodosFilter} from '../../redux/modules/todos';
class Todos extends Component {
    
    constructor(){
        super();
    }
    
    render(){
        return (<div>
            <Header
                as='h3'
                content='Todos'
                inverted
                style={{ fontSize: '3.5em', fontWeight: 'normal', marginBottom: 0 }}
            />
            <TodoList
                filter={this.props.filter} 
                todos={this.props.todos}
                add={this.props.add.bind(this)}
                remove={this.props.remove.bind(this)}
                complete={this.props.complete.bind(this)}
                changeFilter={this.props.changeFilter.bind(this)}
            >
            </TodoList>
        </div>
    );
  }
}

const connectStateToProps = state => ({
    filter: state.todosFilter,
    todos : state.todos,
});

const connectDispatchToProps = dispatch => ({
    add : (todo) => dispatch(addTodo(todo)),
    remove : (id) => dispatch(removeTodo(id)),
    complete : (id) => dispatch(completeTodo(id)),
    changeFilter : (filter) => dispatch(setTodosFilter(filter)),
});
 
export default connect(connectStateToProps,connectDispatchToProps)(Todos);