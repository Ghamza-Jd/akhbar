import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, FlatList } from 'react-native';
import moment from 'moment';
import { News } from 'types';
import { useNavigation } from '@react-navigation/native';

import { Title } from '&components/layout';
import { NewsHeadline } from '&components/cards/NewsHeadline';
import { Loader } from '&components/loader/loader';
import { H2 } from '&components/typography';
import { realm } from '&storage/realmDAO';

const { width } = Dimensions.get('window');

export const Historyfeed = () => {
  const navigation = useNavigation();
  const [news, setNews] = React.useState<Realm.Results<Realm.Object> | []>();
  const [loading, setLoading] = useState(true);
  const getNews = () => {};

  React.useEffect(() => {
    setNews(realm.retrieveAll('news_history'));
    setLoading(false);

    const unsubFocus = navigation.addListener('focus', () => {
      setNews(realm.retrieveAll('news_history'));
      setLoading(false);
    });

    const unsubBlur = navigation.addListener('blur', () => {
      setNews([]);
      setLoading(true);
    });

    return () => {
      unsubFocus();
      unsubBlur();
    };
  }, []);

  const onPress = (item: News) => {
    const newsItem: News = { ...item, viewedAt: moment().unix() };
    realm.insert('news_history', newsItem);
    navigation.navigate('history/news', {
      ...item,
    });
  };

  const isEmpty = () => {
    return !loading && news?.length! <= 0;
  };

  return (
    <View style={styles.container}>
      <Title title="History" noBack />
      {isEmpty() && (
        <View style={styles.empty}>
          <H2>Nothing to show</H2>
        </View>
      )}
      {loading ? (
        <Loader />
      ) : (
        <FlatList
          data={news}
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: width * 0.04 }}
          keyExtractor={(_item, index) => index.toString()}
          onEndReachedThreshold={0.9}
          onEndReached={getNews}
          renderItem={({ item }) => {
            const newsItem = JSON.parse(JSON.stringify(item));
            return (
              <NewsHeadline
                {...newsItem}
                onPress={() => {
                  onPress(newsItem);
                }}
              />
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
