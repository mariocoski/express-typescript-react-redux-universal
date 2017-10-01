import { addTodo, removeTodo, toggleTodo, completeTodo,todosReducer,todosFilterReducer, setTodosFilter } from '../../universal/redux/modules/todos/index';
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, SET_TODOS_FILTER } from '../../universal/constants/action_types';
import {v4} from 'uuid';
import React from 'react';
import renderer from 'react-test-renderer';

describe('REDUX', () => {

  describe('TODOS', () => {

    it('Should be able to create add todo action', () => {
      const text = 'buy milk';
      const expectedAction = {
        type: ADD_TODO,
        payload: text
      };
      expect(addTodo(text)).toEqual(expectedAction);
    });

    it('Should be able to create remove todo action', () => {
      const id = 1;
      const expectedAction = {
        type: REMOVE_TODO,
        payload: id
      };
      expect(removeTodo(id)).toEqual(expectedAction);
    });

    
    it('Should be able to create toggle action', () => {
      const id = 1;
      const expectedAction = {
        type: TOGGLE_TODO,
        payload: id
      };
      expect(toggleTodo(id)).toEqual(expectedAction);
    });

    it('Reducer should return initial state when no action provided', () => {
      expect(todosReducer(undefined, {})).toEqual([]);
    });

    it('Should handle add todo action', () => {
      const text = 'buy milk';
      const expectedState = [{
        id: v4(),
        title: text,
        completed: false,
      }];
      expect(todosReducer([], addTodo(text))).toEqual(expectedState);
    });

    it('Should handle remove todo action', () => {
      const id = v4();
      const initialState = [{
        id,
        title: 'buy milk',
        completed: false,
      }];
      expect(todosReducer(initialState, removeTodo(id))).toEqual([]);
    });

    it('Should handle toggle todo action', () => {
      const id = v4();
      const text = 'buy butter';
      const initialState = [{
        id,
        title: text,
        completed: false,
      }];

      const expectedState = [{
          id,
          title: text,
          completed: true,
      }];
      expect(todosReducer(initialState, toggleTodo(id))).toEqual(expectedState);
    });
  });

  describe('FILTERS', () => {
    it('Reducer should return initial state when not action provided', () => {

      expect(todosFilterReducer(undefined, {})).toEqual('SHOW_ALL');
    });

    it('Should be able to create set filter action', () => {
      const text = 'SHOW_COMPLETED';
      const expectedAction = {
        type: SET_TODOS_FILTER,
        payload: text
      };
      expect(setTodosFilter(text)).toEqual(expectedAction);
    });

    it('Should handle set todos filter action', () => {
      const text = "SHOW_COMPLETED";
      const expectedState = text;
      expect(todosFilterReducer(undefined, setTodosFilter(text))).toEqual(expectedState);
    });

    it('renders correctly', () => {
      const tree = renderer.create(
        <div>OK</div>
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });


  });
});