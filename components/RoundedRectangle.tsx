import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Modal } from "react-native";
import { ThemedText } from "./ThemedText";
import { useFonts } from "expo-font";
import { useLayoutEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { NewUser } from '../components/NewUser';
import { AddCustomer } from './AddCustomer'

import { db } from "../constants/firebaseConfig";
import { ref, onValue } from "firebase/database";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export function RoundedRectangle() {
  const [modalVisible, setModalVisible] = useState(false);
  const [header, setheader] = useState<{ header: string; addButton: string }>({
    header: "",
    addButton: ""
  });

  useEffect(() => {
      const labelRef = ref(db, "labelMapping/mainScreen");
  
      const headerLabels = onValue(labelRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setheader({
            header: data.header,
            addButton: data.addButton
          });
        }
      });
    
      return () => {
        headerLabels();
      }
    }, []);

  const [fontsLoaded] = useFonts({
    "IBMPlexSansThai-Medium": require("../assets/fonts/IBMPlexSansThai-Medium.ttf"),
  });

  useLayoutEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  


  return (
    <View style={[styles.box]}>
      <View style={[styles.divHeader]}>
        <View style={[styles.divHeaderText]}>
          <ThemedText style={[styles.textArrow]}>{"<"}</ThemedText>
          <ThemedText style={[styles.text]}>{header.header}</ThemedText>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
          <Image
            source={require("../assets/images/Action Icon.svg")}
            style={styles.buttonIcon}
          />
          <ThemedText style={[ styles.textButton ]}>{header.addButton}</ThemedText>
        </TouchableOpacity>
      </View>
      <SearchBar style={styles.container}></SearchBar>
      <NewUser></NewUser>

      {/* Pop-Up */}
      <AddCustomer visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 21,
    alignItems: "center",
    marginInline: 40,
    marginBottom: 30,
    marginTop: 10,
  },
  box: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 20,
    marginInline: 20,
    marginTop: 10,

    // เงาสำหรับ iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    // เงาสำหรับ Android
    elevation: 10,
  },
  divHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 40,
  },
  divHeaderText: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
    color: "#004C65",
    fontFamily: "IBMPlexSansThai-Bold",
    fontSize: 24,
  },
  textButton: {
    marginLeft: 10,
    color: "#004C65",
    fontFamily: "IBMPlexSansThai-Medium",
    fontSize: 16,
  },
  textArrow: {
    marginRight: 5,
    color: "#004C65",
    fontFamily: "IBMPlexSansThai-Bold",
    fontSize: 25,
  },
  button: {
    padding: 10, // เพิ่ม padding เพื่อให้แตะง่ายขึ้น
    flexDirection: "row",
    alignItems: 'center'
  },
  buttonIcon: {
    width: 17,
    height: 17,
    resizeMode: "contain",
  },
});
