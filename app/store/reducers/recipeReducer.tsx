import createReducer from 'app/lib/createReducer';
import * as types from 'app/store/actions/types';

const initialState: any = {
    recipeName: '',
    dishType: [],
    occasionType: [],
    cuisineType: [],
    recipeType: '',
    portionType:'pieces',
    portionSize:1,
};

export const recipeReducer = createReducer(initialState, {
    [types.UPDATE_RECIPE](state: any, action: any) {
        return {
            ...state,
            ...action.data
        };
    },
});
