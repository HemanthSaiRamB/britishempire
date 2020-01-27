/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Surface, Text, Paragraph, Button, Colors } from "react-native-paper";
import { scale } from "../helpers/scaler";
export default function TrackInfo(props) {
  let total = props.total ? props.total : 0;
  let completed = props.completed ? props.completed : 0;
  let pending = props.pending ? props.pending : 0;
  let todos = props.todos ? props.todos : 0;
  let action = props.action ? props.action : () => {};
  let active = props.active ? props.active : 1;
  let activeStyle = state => {
    return {
      backgroundColor: state === active ? Colors.grey100 : Colors.green100,
      elevation: 12
    };
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <Surface style={[activeStyle(1), styles.surface]}>
        <TouchableOpacity onPress={() => action(1)}>
          <Paragraph>Registered</Paragraph>
          <Text style={{ fontSize: 50 }}>{total}</Text>
          <Paragraph>Tickets</Paragraph>
        </TouchableOpacity>
      </Surface>
      <Surface style={[activeStyle(2), styles.surface]}>
        <TouchableOpacity onPress={() => action(2)}>
          <Text style={{ fontSize: 50 }}>{completed}</Text>
          <Paragraph>Completed</Paragraph>
        </TouchableOpacity>
      </Surface>
      <Surface style={[activeStyle(3), styles.surface]}>
        <TouchableOpacity onPress={() => action(3)}>
          <Text style={{ fontSize: 50 }}>{pending}</Text>
          <Paragraph>Pending</Paragraph>
        </TouchableOpacity>
      </Surface>
      <Surface style={[activeStyle(4), styles.surface]}>
        <TouchableOpacity onPress={() => action(4)}>
          <Text style={{ fontSize: 50 }}>{todos}</Text>
          <Paragraph>Todos</Paragraph>
        </TouchableOpacity>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    height: 180,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4
  }
});
