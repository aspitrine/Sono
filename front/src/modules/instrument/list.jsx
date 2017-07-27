import { List, Map, fromJS } from 'immutable'
import { axiosResource } from '../../utils/resources'

export const SET_DATA = 'instrument/edit/SET_DATA'
export const LOADING = 'instrument/edit/LOADING'

const initialState = Map({
  data: List([
    { value: 'vocal', label: 'Voix' },
    { value: 'guitar', label: 'Guitare' },
    { value: 'electricGuitar', label: 'Guitare élecrique' },
    { value: 'bassGuitar', label: 'Guitare basse' },
    { value: 'piano', label: 'Piano' },
    { value: 'brass', label: 'Cuivre' }
  ]),
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
