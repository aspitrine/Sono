import { List, Map, fromJS } from 'immutable';
import { axiosResource } from '../../utils/resources'

export const SET_DATA = 'stage/list/SET_DATA'
export const LOADING = 'stage/list/LOADING'

const initialState = Map({
  data: List([]),
  isLoading: false
})

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return state.set('data', fromJS(action.value));

    case LOADING:
      return state.set('isLoading', action.value)

    default:
      return state
  }
}

export const getData = () => async (dispatch) => {
  dispatch({
    type: LOADING,
    value: true
  })

  const result = await axiosResource.get('scene');

  dispatch({
    type: SET_DATA,
    value: result.data
  })

  dispatch({
    type: LOADING,
    value: false
  })
}
