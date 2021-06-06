import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import { H1, H2, P } from '&components/typography';

interface NewsHeadlineProps {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  urlToImage: string;
  onPress: (event: GestureResponderEvent) => void;
}

export const NewsHeadline: React.FC<NewsHeadlineProps> = React.memo(
  (props) => {
    return (
      <Pressable onPress={props.onPress}>
        <View style={styles.container}>
          <Image source={{ uri: props.urlToImage }} style={styles.image} />
          <H1>{props.title}</H1>
          <P numberOfLines={2}>{props.description}</P>
          <View style={styles.row}>
            <SimpleLineIcon name="pencil" style={styles.icon} size={14} />
            <H2>Author: {props.author}</H2>
          </View>
          <View style={styles.row}>
            <Ionicon name="time-outline" style={styles.icon} size={14} />
            <H2>{props.publishedAt}</H2>
          </View>
        </View>
      </Pressable>
    );
  },
  () => true,
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 3,
    margin: 2,
  },
  image: {
    minHeight: 200,
    borderRadius: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
});
