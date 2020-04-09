import produce from 'immer';

const initialState = {
    todo: []
}

export const TODO_DATA_REQUEST = 'TODO_DATA_REAUEST';
export const TODO_DATA_SUCCESS = 'TODO_DATA_SUCCESS';
export const TODO_DATA_FAILURE = 'TODO_DATA_FAILURE';

export const TODO_ADD_REQUEST = 'TODO_ADD_REQUEST';
export const TODO_ADD_SUCCESS = 'TODO_ADD_SUCCESS';
export const TODO_ADD_FAILURE = 'TODO_ADD_FAILURE';

export default (state=initialState, action) => {
    return produce(state, (draft) => {
        // eslint-disable-next-line default-case
        switch(action.type){
            case 'TODO_DATA_REQUEST': { 
                break;
            }
            case 'TODO_DATA_SUCCESS': { 
                draft.outputs[0] = action.data;
                break;
            }
            case 'TODO_DATA_FAILURE': { 
                draft.apiError = action.error
                break;
            }
            case 'TODO_ADD_REQUEST': { 
                break;
            }
            case 'TODO_ADD_SUCCESS': { 
                draft.todo.push(action.data);
                break;
            }
            case 'TODO_ADD_FAILURE': { 
                draft.apiError = action.error
                break;
            }

        }
    })
}