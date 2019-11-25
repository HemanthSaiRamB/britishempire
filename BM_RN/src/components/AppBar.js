import React from 'react';
import {Appbar} from 'react-native-paper';
export default function AppBar(props) {
  let visible = props.menuVisible ? props.menuVisible : false;
  let openMenu = props.openMenu ? props.openMenu : () => {};
  let closeMenu = props.closeMenu ? props.closeMenu : () => {};
  return (
    <Appbar.Header>
      <Appbar.Content title="British Empire" subtitle="All Tickets" />
      <Appbar.Action icon="dots-vertical" onPress={openMenu} />
    </Appbar.Header>
  );
}
