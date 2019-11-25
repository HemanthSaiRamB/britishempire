/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Logo} from './Logo';
import {Title, Subheading} from 'react-native-paper';
export function Header(props) {
  let title = props.title ? props.title : '';
  let subheader = props.subheader ? props.subheader : '';
  return (
    <View>
      <Logo />
      <Title style={{alignSelf: 'center', paddingTop: 15}}>{title}</Title>
      <Subheading style={{alignSelf: 'center'}}>{subheader}</Subheading>
    </View>
  );
}
