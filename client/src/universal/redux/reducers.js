import {todosReducer as todos, todosFilterReducer as todosFilter} from './modules/todos';
import {loginReducer} from './modules/auth/login';
import { reducer as responsive } from 'react-responsive-redux'
import {reducer as toastr} from 'react-redux-toastr';
import { reducer as form } from 'redux-form'
export default {
  auth: loginReducer,
  todos,
  responsive,
  toastr,
  form,
  todosFilter
};