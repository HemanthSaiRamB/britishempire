import React from 'react';
import {RadioButton} from 'react-native-paper';

export default class Radio extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
    return (
        <RadioButton.Group
                onPress={value => props.setComPriority("priority", value)}
                style={{flexDirection:'row', justifyContent:'space-between'}}
                value={props.value}>
                <RadioButton.Item label="Low" value={0} />
                <RadioButton.Item label="Medium" value={1} />
                <RadioButton.Item label="High" value={2} />
              </RadioButton.Group>
    )}
}