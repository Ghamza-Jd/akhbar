import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { News, Source } from 'types';
import axios from 'axios';
import moment from 'moment';
import config from 'react-native-config';

interface SourceSlice {
  status: 'pending' | 'fulfilled' | 'rejected';
  sources: Source[];
  news: News[];
  page: number;
}

const initialState: SourceSlice = {
  status: 'pending',
  sources: [],
  news: [],
  page: 1,
};

const fetchSources = createAsyncThunk(
  'sources/fetchSources',
  async (_req, { rejectWithValue }) => {
    try {
      const instance = axios.create();
      const res = await instance.get(`${config.NEWS_API_ENDPOINT}/sources`, {
        headers: {
          'x-api-key': config.NEWS_API_AUTH_KEY,
        },
      });
      return res.data;
    } catch (e) {
      rejectWithValue({
        error: 'failed to fetch data',
      });
    }
  },
);

const fetchNews = createAsyncThunk(
  'sources/fetchNews',
  async (req, { getState, rejectWithValue }) => {
    const { sourceId } = req;
    try {
      const state = getState().sources;
      const instance = axios.create();
      const res = await instance.get(
        `${config.NEWS_API_ENDPOINT}/everything?sources=${sourceId}&page=${state.page}`,
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

const sourcesSlice = createSlice({
  name: 'sources',
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    resetNews: (state) => {
      return {
        ...state,
        news: [],
        page: 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSources.pending, (_state, _action) => {});
    builder.addCase(fetchSources.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      const sources = action.payload.sources.map((item: Source) => {
        return {
          id: item.id,
          name: item.name,
        };
      });
      state.sources.push(...sources);
    });
    builder.addCase(fetchSources.rejected, (_state, _action) => {});
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
      console.log(JSON.stringify(articles, null, '  '));
      state.news.push(...articles);
    });
  },
});

export const sourcesReducer = sourcesSlice.reducer;

export const sourcesActions = {
  ...sourcesSlice.actions,
  fetchSources,
  fetchNews,
};
