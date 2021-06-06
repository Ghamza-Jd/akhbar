import { combineReducers } from '@reduxjs/toolkit';

import { newsReducer } from '&screens/newsfeed/Newsfeed.slice';
import { sourcesReducer } from '&screens/sources/Sources.slice';

const rootReducer = combineReducers({
  news: newsReducer,
  sources: sourcesReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;

export { rootReducer };
