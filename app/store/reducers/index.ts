/*
 * combines all th existing reducers
 */
import * as loadingReducer from './loadingReducer';
import * as loginReducer from './loginReducer';
import * as themeReducer from './themeReducer';
import * as recipeReducer from './recipeReducer';

export default Object.assign(loginReducer, loadingReducer, themeReducer,recipeReducer);
