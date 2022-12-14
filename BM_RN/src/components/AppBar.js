/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Appbar} from 'react-native-paper';

export default function AppBar(props) {
  // let visible = props.menuVisible ? props.menuVisible : false;
  let action = props.action ? props.action : () => {};
  let profile = props.profile ? props.profile : () => alert("Profile Screen");
  // let closeMenu = props.closeMenu ? props.closeMenu : () => {};
  return (
    <Appbar.Header>
      <Appbar.Content onPress={profile} title="British Empire" subtitle="All Tickets" />
      <Appbar.Action icon="logout" onPress={action} />
    </Appbar.Header>
  );
}
