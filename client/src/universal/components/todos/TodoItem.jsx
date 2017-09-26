import React from 'react';
import { List } from 'semantic-ui-react';
const TodoItem = (props) => (
  <List.Item>
      <List.Content>
        <List.Header>{props.todo.title}</List.Header>
        An excellent companion
      </List.Content>
  </List.Item>
);

export default TodoItem;