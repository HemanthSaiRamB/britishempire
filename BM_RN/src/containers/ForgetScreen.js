import React, { useState } from "react";
import { View, Text } from "react-native";
import { Portal, Modal, Card, Button } from "react-native-paper";
import { Input } from "../components/Input";
import { resetPassword } from "../redux/Actions/tickets";
export const ForgetScreen = (props) => {
  let visible = props.visible ? props.visible : false;
  let _hideModal = props.hideModal ? props.hideModal : () => {};
  let [email, setEmail] = useState("");
  let [phn, setPhn] = useState("");
  let [error, setError] = useState("");
  let updateField = (type, text) => {
    if (type === "email") setEmail(text);
    else if (type === "phone") setPhn(text);
    setError("");
  };
  let reset = () => {
    if (email === "" || email.length < 5 || phn === "" || phn.length < 5) {
      setError("Fill All the fields to reset.");
    } else {
      resetPassword(email, phn)
        .then(res => setError(res.name))
        .catch(err => {
            setError("Something went wrong")
        });
    }
  };
  return (
    <Portal>
      <Modal dismissable={true} visible={visible} onDismiss={_hideModal}>
        <View style={{ width: "70%", alignSelf: "center" }}>
          <Card>
            <Card.Title
              title="Forget Password"
              subtitle="Enter following information to reset credentials"
            />
            <Card.Content>
              <Input
                value={email}
                label={"Email Address"}
                type={"email"}
                change={updateField}
              />
              <Input
                style={{ height: 45 }}
                value={phn}
                label={"Phone number"}
                type={"phone"}
                change={updateField}
              />
              {error != "" && (
                <Text
                  style={{
                    paddingVertical: 5,
                    textAlign: "center",
                    color: "#f44336",
                  }}
                >
                  {error}
                </Text>
              )}
            </Card.Content>
            <Card.Actions>
              <Button
                style={{ alignSelf: "flex-end" }}
                onPress={() => reset()}
                mode="outlined"
                icon="check"
              >
                {"Get Password"}
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </Modal>
    </Portal>
  );
};
