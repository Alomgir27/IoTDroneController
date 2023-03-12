import React, { useState , useEffect, useRef} from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity, ImageBackground, Text} from "react-native";
import firebase from "./firebase";

import { Grid, Row, Col } from "react-native-easy-grid";

import { Slider } from "react-native-elements";
import Orientation from "react-native-orientation-locker";




const ControlPanel = () => {
  const [wingLeft, setWingLeft] = useState(false);
  const [wingRight, setWingRight] = useState(false);
  const [wingUp, setWingUp] = useState(false);
  const [wingDown, setWingDown] = useState(false);
  const [raddarLeft, setRaddarLeft] = useState(false);
  const [raddarRight, setRaddarRight] = useState(false);
  const [motorPowerRange, setMotorPowerRange] = useState(0);

  const wingLeftRef = useRef();
  const wingRightRef = useRef();
  const wingUpRef = useRef();
  const wingDownRef = useRef();
  const raddarLeftRef = useRef();
  const raddarRightRef = useRef();
  const motorPowerRangeRef = useRef();

  wingLeftRef.current = wingLeft;
  wingRightRef.current = wingRight;
  wingUpRef.current = wingUp;
  wingDownRef.current = wingDown;
  raddarLeftRef.current = raddarLeft;
  raddarRightRef.current = raddarRight;
  motorPowerRangeRef.current = motorPowerRange;

  // useEffect(() => {
  //   // landscape mode only
  //   Orientation.lockToLandscapeLeft();

  //   return () => {
  //     Orientation.unlockAllOrientations();
  //   };
  // }, []);

  useEffect(() => {
    const db = firebase.database().ref("wing");
    db.on("value", (snap) => {
      setWingLeft(snap.val());
    });
  }, []);

  useEffect(() => {
    const db = firebase.database().ref("wing");
    db.on("value", (snap) => {
      setWingRight(snap.val());
    });
  }, []);

  useEffect(() => {
    const db = firebase.database().ref("elevator");
    db.on("value", (snap) => {
      setWingUp(snap.val());
    });
  }, []);

  useEffect(() => {
    const db = firebase.database().ref("elevator");
    db.on("value", (snap) => {
      setWingDown(snap.val());
    });
  } , []);

  useEffect(() => {
    const db = firebase.database().ref("motor");
    db.on("value", (snap) => {
      setMotorPowerRange(snap.val() / 180 * 100);
    });
  }, []);

  useEffect(() => {
    const db = firebase.database().ref("rudder");
    db.on("value", (snap) => {
      setRaddarLeft(snap.val());
    });
  }, []);

  useEffect(() => {
    const db = firebase.database().ref("rudder");
    db.on("value", (snap) => {
      setRaddarRight(snap.val());
    });
  }, []);

  const wingLeftHandlerIn = () => {
    firebase.database().ref("wing").set(30);
  };

  const wingLeftHandlerOut = () => {
    firebase.database().ref("wing").set(60);
  };

  const wingRightHandlerIn = () => {
    firebase.database().ref("wing").set(90);
  };

  const wingRightHandlerOut = () => {
    firebase.database().ref("wing").set(60);
  };

  const wingUpHandlerIn = () => {
    firebase.database().ref("elevator").set(60);
  };

  const wingUpHandlerOut = () => {
    firebase.database().ref("elevator").set(45)
  };

  const wingDownHandlerIn = () => {
    firebase.database().ref("elevator").set(30);
  };

  const wingDownHandlerOut = () => {
    firebase.database().ref("elevator").set(45);
  };

  const raddarLeftHandlerIn = () => {
    firebase.database().ref("rudder").set(60);
  };

  const raddarLeftHandlerOut = () => {
    firebase.database().ref("rudder").set(90);
  };

  const raddarRightHandlerIn = () => {
    firebase.database().ref("rudder").set(120)
  };

  const raddarRightHandlerOut = () => {
    firebase.database().ref("rudder").set(90);
  };
  
  const motorPowerRangeHandler = (rangeValue) => {
    firebase.database().ref("motor").set(parseInt(rangeValue / 100 * 180));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("./assets/image.jpg")} style={styles.image} />
        <Grid style={[styles.grid, { marginLeft: 10 }]}>
          <Row style={styles.row}>
            <Col style={styles.col}>
              <Slider
                value={motorPowerRange}
                onValueChange={motorPowerRangeHandler}
                maximumValue={100}
                minimumValue={0}
                step={1}
                thumbTintColor="green"
                minimumTrackTintColor="green"
                maximumTrackTintColor="white"
                style={{ width: 250, height: 40 }}
                sliderWidth={200}
                sliderHeight={40}
                sliderRadius={20}
                thumbRadius={20}
                trackStyle={{ backgroundColor: "green" }}
                thumbTouchSize={{ width: 40, height: 40 }}
              />
              <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                  Motor Power Range : {(motorPowerRangeRef.current / 100 * 180).toFixed(0)}%
               </Text>
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col style={styles.col}>
                <TouchableOpacity style={styles.button} onPressIn={raddarLeftHandlerIn} onPressOut={raddarLeftHandlerOut}>
                    <MaterialCommunityIcons
                      name="arrow-left-bold-circle-outline"
                      size={50}
                      color={raddarLeft === 60 ? "green" : "white"}
                    />
                  </TouchableOpacity>
              </Col>
              <Col style={styles.col}>
                <TouchableOpacity style={styles.button} onPressIn={raddarRightHandlerIn} onPressOut={raddarRightHandlerOut}>
                    <MaterialCommunityIcons
                      name="arrow-right-bold-circle-outline"
                      size={50} 
                      color={raddarRight === 120 ? "green" : "white"}
                    />
                  </TouchableOpacity>
              </Col>
            </Row>
        </Grid>
        <Grid style={[styles.grid, { marginRight: 10 , borderColor: "white", borderWidth: 1, borderRadius: 10, }]}>
          <Row style={styles.row}>
            <Col style={styles.col}>
            </Col>
            <Col style={styles.col}>
              <TouchableOpacity
                style={styles.button}
                onPressIn={wingUpHandlerIn}
                onPressOut={wingUpHandlerOut}
              >
                <MaterialCommunityIcons
                  name="arrow-up"
                  size={50}
                  color={wingUp === 60 ? "green" : "white"}
                />
              </TouchableOpacity>
            </Col>
            <Col style={styles.col}>
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col style={styles.col}>
              <TouchableOpacity
                style={styles.button}
                onPressIn={wingLeftHandlerIn}
                onPressOut={wingLeftHandlerOut}
              >
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={50}
                  color={wingLeft === 30 ? "green" : "white"}
                />
              </TouchableOpacity>
            </Col>
            <Col style={styles.col}>
            </Col>
            <Col style={styles.col}>
              <TouchableOpacity
                style={styles.button}
                onPressIn={wingRightHandlerIn}
                onPressOut={wingRightHandlerOut}
              >
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={50}
                  color={wingRight === 90 ? "green" : "white"}
                />
              </TouchableOpacity>
            </Col>
          </Row>
          <Row style={styles.row}>
            <Col style={styles.col}>
            </Col>
            <Col style={styles.col}>
              <TouchableOpacity
                style={styles.button}
                onPressIn={wingDownHandlerIn}
                onPressOut={wingDownHandlerOut}
              >
                <MaterialCommunityIcons
                  name="arrow-down"
                  size={50}
                  color={wingDown === 30 ? "green" : "white"}
                />
              </TouchableOpacity>
            </Col>
            <Col style={styles.col}>

            </Col>
          </Row>
        </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
    },
    borderGradient: {
      flex: 1,
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor: "#000000",
    },
  },
 
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
  },
  grid: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    padding: 20,
  },
  row: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

   
  },
  col: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
   
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: -1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

});

export default ControlPanel;


