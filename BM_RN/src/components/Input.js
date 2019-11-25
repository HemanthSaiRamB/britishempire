import React from 'react';
import {TextInput} from 'react-native-paper';

export function Input(props) {
  let change = props.change ? props.change : () => {};
  let label = props.label ? props.label : '';
  let value = props.value ? props.value : '';
  let type = props.type ? props.type : '';
  let secure = props.secure ? props.secure : false;
  let styles = props.style ? props.style : {};
  return (
    <TextInput
      mode={'outlined'}
      style={styles}
      label={label}
      autoCapitalize={'none'}
      clearButtonMode={'while-editing'}
      value={value}
      secureTextEntry={secure}
      onChangeText={text => change(type, text)}
    />
  );
}
