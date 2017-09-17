import * as counter from './counter';
import { reducer as responsiveReducer } from 'react-responsive-redux'
export default {
  counter,
  responsive: responsiveReducer
};