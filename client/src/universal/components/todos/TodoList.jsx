import React from 'react';
import TodoItem from './TodoItem';
import {List, Segment, Grid, Input} from 'semantic-ui-react'
const TodoList = (props) => {

  const todos = props.todos.map((todo,key) => 
    <TodoItem 
      todo={todo} key={key} 
      complete={props.complete} remove={props.remove} 
    >
    </TodoItem>
  );
  
  console.log(props);
  return ( <Grid columns={2} padded>
            <Grid.Column>
              {props.todos.length > 0 && <Segment inverted>
                <List divided relaxed inverted>
                  {todos}
                </List>
              </Segment>
              }
              <Input
                  action={
                      { 
                        color: 'teal', labelPosition: 'right', icon: 'send', 
                        content: 'Add todo', onClick: ()=>{props.add('new one')} 
                      }
                    }
                  defaultValue=''
                  fluid
                  placeholder="your todo..."
                />
             
            </Grid.Column>
      </Grid>);


}

export default TodoList;

