import { List, Map, fromJS } from 'immutable'
import { axiosResource } from '../../utils/resources'
import { toastr } from 'react-redux-toastr'

export const SET_DATA = 'stage/show/SET_DATA'
export const LOADING = 'stage/show/LOADING'
export const CHANGE_INSTRUMENT = 'stage/show/CHANGE_INSTRUMENT'
export const ADD_ACTION = 'stage/show/ADD_ACTION'
export const SET_ACTIONS = 'stage/show/SET_ACTIONS'

const initialState = Map({
  data: Map({
    _id: false,
    name: '',
    instruments: List([]),
    actions: List([]),
  }),
  currentInstrument: Map({
    value: '',
    label: '',
    index: false
  }),
  isLoading: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return state.set('data', fromJS(action.value))

    case LOADING:
      return state.set('isLoading', action.value)

    case CHANGE_INSTRUMENT:
      return state.set('currentInstrument', fromJS(action.instrument))

    case ADD_ACTION:
      const actions = state.getIn(['data', 'actions']).size ? state.getIn(['data', 'actions']).toJS() : [];
      actions.push(action.action);
      return state.setIn(['data', 'actions'], fromJS(actions));

    case SET_ACTIONS:
      return state.setIn(['data', 'actions'], fromJS(action.value));

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

export const setActions = (actions) => async (dispatch) => {
  dispatch({
    type: SET_ACTIONS,
    value: actions
  })
}

export const changeCurrentInstrument = (index) => async (dispatch, getState) => {
  const state = getState().stageShow.toJS();
  dispatch({
    type: CHANGE_INSTRUMENT,
    instrument: { ...state.data.instruments[index].instrument, index: index }
  })
}

export const addAction = (action) => async (dispatch) => {
  dispatch({
    type: ADD_ACTION,
    action: action
  })
}
