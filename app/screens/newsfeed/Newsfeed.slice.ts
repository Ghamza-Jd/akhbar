import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { News } from 'types';
import axios from 'axios';
import moment from 'moment';
import config from 'react-native-config';

interface NewsSlice {
  status: 'pending' | 'fulfilled' | 'rejected';
  news: News[];
  page: number;
}

const initialState: NewsSlice = {
  status: 'pending',
  news: [],
  page: 1,
};

const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_req, { getState, rejectWithValue }) => {
    try {
      const state = getState().news;
      const instance = axios.create();
      const res = await instance.get(
        // TODO: use query-string
        `${config.NEWS_API_ENDPOINT}/everything?q=(UAE%20AND%20(sports%20OR%20business))%20OR%20(Egypt%20AND%20(sports%20OR%20business))&page=${state.page}`,
        {
          headers: {
            'x-api-key': config.NEWS_API_AUTH_KEY,
          },
        },
      );
      return res.data;
    } catch (e) {
      rejectWithValue({
        error: 'failed to fetch data',
      });
    }
  },
);

const newsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (_state, _action) => {});
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      const articles = action.payload.articles.map((item: News) => {
        return {
          ...item,
          publishedAt: moment(item.publishedAt).format(
            'MMMM D, YYYY [at] h:mm A',
          ),
        };
      });
      state.page++;
      state.news.push(...articles);
    });
    builder.addCase(fetchNews.rejected, (_state, _action) => {});
  },
});

export const newsReducer = newsSlice.reducer;

export const newsActions = { ...newsSlice.actions, fetchNews };
