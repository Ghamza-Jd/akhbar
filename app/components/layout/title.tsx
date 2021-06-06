import React, { ReactNode } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { Content } from './content';
import { H1 } from '&components/typography';

const { height } = Dimensions.get('window');

interface TitleProps {
  rightComponent?: ReactNode;
  noBack?: boolean;
  title: string;
}

export const Title: React.FC<TitleProps> = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Content style={styles.content}>
        <View style={styles.left}>
          {!props.noBack && (
            <TouchableOpacity onPress={navigation.goBack}>
              <Ionicon name="chevron-back" size={24} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.center}>
          <H1>{props.title}</H1>
        </View>
        <View style={styles.right}>{props.rightComponent}</View>
      </Content>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: height * 0.08,
  },
  left: {
    flex: 0.33,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  center: {
    flex: 0.33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flex: 0.33,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
