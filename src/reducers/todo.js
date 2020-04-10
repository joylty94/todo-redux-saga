import produce from 'immer';

const initialState = {
    todo: [],
    LoadDataError: '',
    AddDataError: '',
    loading: false,
}

export const TODO_DATA_REQUEST = 'TODO_DATA_REQUEST';
export const TODO_DATA_SUCCESS = 'TODO_DATA_SUCCESS';
export const TODO_DATA_FAILURE = 'TODO_DATA_FAILURE';

export const TODO_ADD_REQUEST = 'TODO_ADD_REQUEST';
export const TODO_ADD_SUCCESS = 'TODO_ADD_SUCCESS';
export const TODO_ADD_FAILURE = 'TODO_ADD_FAILURE';

export const TODO_DELETE_REQUEST = 'TODO_DELETE_REQUEST';
export const TODO_DELETE_SUCCESS = 'TODO_DELETE_SUCCESS';
export const TODO_DELETE_FAILURE = 'TODO_DELETE_FAILURE';

export const TODO_UPDATE_REQUEST = 'TODO_UPDATE_REQUEST';
export const TODO_UPDATE_SUCCESS = 'TODO_UPDATE_SUCCESS';
export const TODO_UPDATE_FAILURE = 'TODO_UPDATE_FAILURE';

export default (state=initialState, action) => {
    return produce(state, (draft) => {
        // eslint-disable-next-line default-case
        switch(action.type){
            case 'TODO_DATA_REQUEST': { 
                draft.loading = true;
                break;
            }
            case 'TODO_DATA_SUCCESS': { 
                draft.todo = action.data;
                draft.loading = false;
                break;
            }
            case 'TODO_DATA_FAILURE': { 
                draft.LoadDataError = action.error;
                draft.loading = false;
                break;
            }
            case 'TODO_ADD_REQUEST': { 
                break;
            }
            case 'TODO_ADD_SUCCESS': { 
                draft.todo.push({data: action.data});
                break;
            }
            case 'TODO_ADD_FAILURE': { 
                draft.AddDataError = action.error
                break;
            }
            case 'TODO_DELETE_REQUEST': { 
                break;
            }
            case 'TODO_DELETE_SUCCESS': { 
                draft.todo = draft.todo.filter((t, i) => t.data !== action.data);
                break;
            }
            case 'TODO_DELETE_FAILURE': { 
                draft.AddDataError = action.error
                break;
            }
            case 'TODO_UPDATE_REQUEST': { 
                break;
            }
            case 'TODO_UPDATE_SUCCESS': { 
                draft.todo = draft.todo.filter((t, i) => t.data !== action.data);
                break;
            }
            case 'TODO_UPDATE_FAILURE': { 
                draft.AddDataError = action.error
                break;
            }

        }
    })
}