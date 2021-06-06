import React from 'react';
import styled from 'styled-components/native';
import { Linking, TouchableOpacity } from 'react-native';

const StyledHyperlink = styled.Text`
  font-size: 14px;
  margin-top: 2px;
  margin-bottom: 2px;
  color: blue;
`;

interface HyperlinkProps {
  children: string;
}

export const Hyperlink: React.FC<HyperlinkProps> = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(props?.children);
      }}>
      <StyledHyperlink>{props?.children}</StyledHyperlink>
    </TouchableOpacity>
  );
};
