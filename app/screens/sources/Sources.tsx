import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootStateType } from 'types';
import { useNavigation } from '@react-navigation/native';

import { NewsSource } from '&components/cards/NewsSource';
import { Loader } from '&components/loader/loader';
import { Title } from '&components/layout';

import { sourcesActions } from './Sources.slice';

export const Sources = () => {
  const sources = useSelector((state: RootStateType) => state.sources);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const fetchSources = () => {
    dispatch(sourcesActions.fetchSources());
  };

  React.useEffect(() => {
    fetchSources();
    return () => {
      dispatch(sourcesActions.reset());
    };
  }, []);

  const onPress = (sourceId: string) => {
    dispatch(sourcesActions.fetchNews({ sourceId }));
    navigation.navigate('sources/newsfeed');
  };

  return (
    <React.Fragment>
      <Title title="Sources" noBack />
      {sources.status === 'pending' ? (
        <Loader />
      ) : (
        <FlatList
          data={sources.sources}
          renderItem={({ item }) => (
            <NewsSource
              name={item.name}
              onPress={() => {
                onPress(item.id);
              }}
            />
          )}
        />
      )}
    </React.Fragment>
  );
};
