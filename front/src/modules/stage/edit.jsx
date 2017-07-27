import { List, Map, fromJS } from 'immutable'
import { axiosResource } from '../../utils/resources'
import { toastr } from 'react-redux-toastr'

export const SET_DATA = 'stage/edit/SET_DATA'
export const LOADING = 'stage/edit/LOADING'
export const ON_CHANGE_PATH_VALUE = 'stage/edit/ON_CHANGE_PATH_VALUE'
export const ADD_INSTRUMENT = 'stage/edit/ADD_INSTRUMENT'
export const REMOVE_INSTRUMENT = 'stage/edit/REMOVE_INSTRUMENT'

const initialState = Map({
  data: Map({
    _id: false,
    name: '',
    instruments: List([])
  }),
  isLoading: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return state.set('data', fromJS(action.value));

    case LOADING:
      return state.set('isLoading', action.value)

    case ADD_INSTRUMENT:
      return state.setIn(['data', 'instruments'], state.getIn(['data', 'instruments']).push(action.instrument))

    case ON_CHANGE_PATH_VALUE:
      return state.setIn(action.path, fromJS(action.value))

    case REMOVE_INSTRUMENT:
      return state.setIn(['data', 'instruments'], state.getIn(['data', 'instruments']).delete(action.index))

    default:
      return state
  }
}

export const save = () => async (dispatch, getState) => {
  try {
    const state = getState().stageEdit.toJS();

    dispatch({
      type: LOADING,
      value: true
    })

    if(state.data._id) {
      await axiosResource.patch(`/scene/${state.data._id}`, state.data);
    } else {
      const result = await axiosResource.post('/scene', state.data);
      dispatch({
        type: ON_CHANGE_PATH_VALUE,
        path: ['data', '_id'],
        value: result.data._id
      })
    }

    toastr.success('Sauvegarde', 'Scène enregistré')

    dispatch({
      type: LOADING,
      value: false
    })
  } catch(e) {
    toastr.error('Une erreur est survenue')
    console.log(e);
  }

}

export const remove = () => async (dispatch, getState) => {
  dispatch({
    type: ON_CHANGE_PATH_VALUE,
    path: ['data', 'name'],
    value: name
  })
}

export const onChangeName = (name) => async (dispatch) => {
  dispatch({
    type: ON_CHANGE_PATH_VALUE,
    path: ['data', 'name'],
    value: name
  })
}

export const addInstrument = (instrument) => async (dispatch) => {
  dispatch({
    type: ADD_INSTRUMENT,
    instrument: instrument
  })
}

export const removeInstrument = (index) => async (dispatch) => {
  dispatch({
    type: REMOVE_INSTRUMENT,
    index: index
  })
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
