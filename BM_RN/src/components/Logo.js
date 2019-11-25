import React from 'react';
import {Image, StyleSheet} from 'react-native';

export function Logo() {
  return (
    <Image
      source={require('./../assets/images/icon.png')}
      style={styles.logo}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 10,
  },
});
