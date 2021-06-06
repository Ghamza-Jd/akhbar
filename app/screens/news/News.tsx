import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import { H1, H2, P, Hyperlink } from '&components/typography';
import { Title } from '&components/layout';

export const News = () => {
  const { params }: any = useRoute();
  return (
    <React.Fragment>
      <Title title="News" />
      <ScrollView style={styles.container}>
        <H1 style={styles.title}>{params?.title}</H1>
        <View style={styles.meta}>
          <View style={styles.row}>
            <SimpleLineIcon name="pencil" style={styles.icon} size={14} />
            <H2>By {params?.author}</H2>
          </View>
          <View style={styles.row}>
            <Ionicon name="time-outline" style={styles.icon} size={14} />
            <H2>{params?.publishedAt}</H2>
          </View>
        </View>
        <Image source={{ uri: params?.urlToImage }} style={styles.image} />
        <P>{params?.description}</P>
        <View style={styles.moreInfo}>
          <P>More info:</P>
          <Hyperlink>{params?.url}</Hyperlink>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 2,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  meta: {
    marginBottom: 10,
  },
  image: {
    minHeight: 200,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  moreInfo: {
    marginTop: 10,
  },
});
