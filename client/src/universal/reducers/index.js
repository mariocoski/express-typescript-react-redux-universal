import * as counter from './counter';
import { reducer as responsive } from 'react-responsive-redux'
import {reducer as toastr} from 'react-redux-toastr';
import { reducer as form } from 'redux-form'
export default {
  counter,
  responsive,
  toastr,
  form
};