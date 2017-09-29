import React, {Component} from 'react';
import { Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import FilteredTodosContainer from '../todos/FilteredTodosContainer';

class TodosContainer extends Component {
    
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
            <FilteredTodosContainer></FilteredTodosContainer>
            
        </div>
    );
  }
}


 
export default TodosContainer;