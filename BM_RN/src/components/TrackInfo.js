/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Surface, Text, Paragraph} from 'react-native-paper';
export default function TrackInfo(props) {
  let total = props.total ? props.total : 0;
  let completed = props.completed ? props.completed : 0;
  let pending = props.pending ? props.pending : 0;
  return (
    <View style={{flexDirection: 'row'}}>
      <Surface style={styles.surface}>
        <Paragraph>Registered</Paragraph>
        <Text style={{fontSize: 50}}>{total}</Text>
        <Paragraph>Tickets</Paragraph>
      </Surface>
      <Surface style={styles.surface}>
        <Text style={{fontSize: 50}}>{completed}</Text>
        <Paragraph>Completed</Paragraph>
      </Surface>
      <Surface style={styles.surface}>
        <Text style={{fontSize: 50}}>{pending}</Text>
        <Paragraph>Pending</Paragraph>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    height: 180,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
