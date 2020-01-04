import React from 'react';
import {TextInput, HelperText} from 'react-native-paper';

export function Input(props) {
  let change = props.change ? props.change : () => {};
  let label = props.label ? props.label : '';
  let value = props.value ? props.value : '';
  let type = props.type ? props.type : '';
  let secure = props.secure ? props.secure : false;
  let styles = props.style ? props.style : {};
  let error = props.error ? props.error : false;
  return (
    <>
      <TextInput
        mode={'outlined'}
        style={styles}
        label={label}
        autoCapitalize={'none'}
        autoCorrect={false}
        clearButtonMode={'while-editing'}
        value={value}
        secureTextEntry={secure}
        onChangeText={text => change(type, text)}
      />
      {error ? <HelperText type="error" visible={error} /> : <></>}
    </>
  );
}
