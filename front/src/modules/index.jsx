
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import stageList from './stage/list'
import stageEdit from './stage/edit'
import stageShow from './stage/show'
import stageShowSono from './stage/showSono'
import instrument from './instrument/list'

export default combineReducers({
  routing: routerReducer,
  stageList,
  stageEdit,
  stageShow,
  stageShowSono,
  instrument,
  toastr: toastrReducer
})
