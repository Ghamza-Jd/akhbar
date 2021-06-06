import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { H2 } from '&components/typography';

interface NewsSourceProps {
  name: string;
  onPress: () => void;
}

export const NewsSource: React.FC<NewsSourceProps> = React.memo(
  (props) => {
    return (
      <Pressable onPress={props.onPress}>
        <View style={styles.container}>
          <H2>{props.name}</H2>
          <View style={styles.row}>
            <H2>View</H2>
            <Ionicons name="chevron-forward" size={24} style={styles.icon} />
          </View>
        </View>
      </Pressable>
    );
  },
  () => true,
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    marginTop: 2,
  },
});
