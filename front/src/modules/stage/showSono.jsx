import { List, Map, fromJS } from 'immutable'
import { axiosResource } from '../../utils/resources'
import { toastr } from 'react-redux-toastr'

export const SET_DATA = 'stage/showSono/SET_DATA'
export const LOADING = 'stage/showSono/LOADING'
export const ADD_ACTION = 'stage/showSono/ADD_ACTION'
export const ACTION_DONE = 'stage/showSono/ACTION_DONE'

const initialState = Map({
  data: Map({
    _id: false,
    name: '',
    instruments: List([]),
    actions: List([]),
  }),
  isLoading: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return state.set('data', fromJS(action.value))

    case LOADING:
      return state.set('isLoading', action.value)

    case ADD_ACTION:
      return state.setIn(['data', 'actions'], state.getIn(['data', 'actions']).push(action.action))

    case ACTION_DONE:
      return state.setIn(['data', 'actions'], fromJS(action.actions));

    default:
      return state
  }
}

export const getData = (_id) => async (dispatch) => {
  dispatch({
    type: LOADING,
    value: true
  })

  const result = await axiosResource.get(`/scene/${_id}`);

  dispatch({
    type: SET_DATA,
    value: result.data
  })

  dispatch({
    type: LOADING,
    value: false
  })
}

export const addAction = (action) => async (dispatch) => {
  dispatch({
    type: ADD_ACTION,
    action: action
  });
}

export const actionDone = (action) => async (dispatch, getState) => {
  let actions = getState().stageShowSono.get('data').toJS().actions;

  actions = _.filter(actions, a => {
    return !_.isEqual(a, action);
  })
  dispatch({
    type: ACTION_DONE,
    actions: actions
  })
}

