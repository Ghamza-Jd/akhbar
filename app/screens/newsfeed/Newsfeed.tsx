import React from 'react';
import { Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, View } from 'react-native';
import { RootStateType, News } from 'types';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import { Title } from '&components/layout';
import { NewsHeadline } from '&components/cards/NewsHeadline';
import { Loader } from '&components/loader/loader';
import { realm } from '&storage/realmDAO';

import { newsActions } from './Newsfeed.slice';

const { width } = Dimensions.get('window');

export const Newsfeed = () => {
  const news = useSelector((state: RootStateType) => state.news);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getNews = () => {
    dispatch(newsActions.fetchNews());
  };

  React.useEffect(() => {
    getNews();
  }, []);

  const onPressNewsHeadline = (item: News) => {
    const newsItem: News = { ...item, viewedAt: moment().unix() };
    realm.insert('news_history', newsItem);
    navigation.navigate('newsfeed/news', {
      ...item,
    });
  };

  return (
    <View>
      <Title title="Home" noBack />
      {news.status === 'pending' ? (
        <Loader />
      ) : (
        <FlatList
          data={news.news}
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: width * 0.04 }}
          keyExtractor={(_item, index) => index.toString()}
          onEndReachedThreshold={0.9}
          onEndReached={getNews}
          renderItem={({ item }) => (
            <NewsHeadline
              {...item}
              onPress={() => {
                onPressNewsHeadline(item);
              }}
            />
          )}
        />
      )}
    </View>
  );
};
