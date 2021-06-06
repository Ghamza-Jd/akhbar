import React from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator animating size="large" color="#888" />
    </View>
  );
};

export const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    flex: 1,
    top: height / 2 - 16,
    left: 0,
    right: 0,
  },
});
