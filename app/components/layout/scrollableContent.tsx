import React from 'react';
import styled from 'styled-components/native';
import { View, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const Content = styled.ScrollView`
  margin-horizontal: 4%;
`;

export const ScrollableContent: React.FC = (props) => {
  return (
    <Content>
      {props.children}
      <View style={styles.spacer} />
    </Content>
  );
};

const styles = StyleSheet.create({
  spacer: {
    height: height * 0.1,
  },
});
