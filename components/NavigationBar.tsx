import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import { View, Image, StyleSheet } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";
import { ThemedText } from "./ThemedText";
import { useCallback } from "react";
import { useLayoutEffect } from 'react';

import * as SplashScreen from "expo-splash-screen";

import { db } from "../constants/firebaseConfig";
import { ref, onValue } from "firebase/database";

// ป้องกัน SplashScreen จากการซ่อนอัตโนมัติ
SplashScreen.preventAutoHideAsync();

export function NavigationBar(){
  const [breadcrumbs, setBreadcrumbs] = useState<{ home: string; plan: string }>({
    home: "",
    plan: "",
  });

  const [profile, setprofile] = useState<{ profileName: string }>({
    profileName: ""
  });

  const [fontsLoaded] = useFonts({
    "IBMPlexSansThai-Bold": require("../assets/fonts/IBMPlexSansThai-Bold.ttf"),
  });

  useLayoutEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const labelRef = ref(db, "labelMapping/breadCrumbs");
    const profileRef = ref(db, "labelMapping/profile");

    const breadCrumbLabels = onValue(labelRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBreadcrumbs({
          home: data.main,
          plan: data.money_plan,
        });
      }
    });

    const profileLabels = onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setprofile({
          profileName: data.profileName
        });
      }
    });
  
    return () => {
      breadCrumbLabels();
      profileLabels();
    }
  }, []);

  if (!fontsLoaded) {
    return null;
  }
    return (
      <View style={[styles.topDiv]}>
        <View style={[styles.profileNoti]}>
          <Image source={require("../assets/images/Logo.png")} alt="Smarty logo" style={[styles.image]}/>
          <View style={[styles.box]}>
            <IconSymbol size={28} name="house.fill" color={"#004C65"} />
            <ThemedText style={[styles.text]}>{breadcrumbs.home}</ThemedText>
          </View>
          <ThemedText style={[styles.textArrow]}>&gt;</ThemedText>
          <ThemedText style={[styles.text]}>{breadcrumbs.plan}</ThemedText>
        </View>
        <View style={[styles.profileNoti]}>
          <View style={styles.profileDiv}>
            <Image source={require("../assets/images/User Profile.png")} alt="Smarty logo" style={[styles.imageProfile]} />
            <ThemedText style={[styles.textProfile]}>{profile.profileName}</ThemedText>
            <Image source={require("../assets/images/Dropdown Icon.png")} alt="ddlIcon" style={[ styles.ddlIcon ]}/>
          </View>
          <Image source={require("../assets/images/noti.png")} alt="notiIcon" style={[ styles.notiIcon ]}/>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    box: {
        backgroundColor: "white",
        borderRadius: 20,
        margin: 20,
        paddingVertical: 5,
        paddingInline: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      },
    text: {
        marginLeft: 10,
        marginTop: 4,
        color: "#004C65",
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 18,
    },
    textProfile: {
        marginLeft: 0,
        marginTop: 4,
        color: "#004C65",
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 18,
    },
    textArrow: {
        marginRight: 5,
        marginTop: 4,
        color: "#004C65",
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: 25,
    },
    image: {
        width: 150,
        height:50,
        resizeMode: 'contain'
    },
    imageProfile: {
        width: 100,
        height:50,
        resizeMode: 'contain'
    },
    topDiv:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    profileNoti: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 2,
        marginBottom: 0
    },
    profileDiv:{
        display: "flex",
        flexDirection: 'row',
        alignItems: "center"
    },
    ddlIcon: {
        width: 12,
        height: 12,
        resizeMode: "contain",
        marginLeft: 10,
        marginTop: 5,
    },
    notiIcon: {
        width: 50,
        height: 50,
        resizeMode: "contain",
        marginLeft: 20,
        marginTop: 5,
        marginRight: 20
    },
    logoBreadcrumbs: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 2,
        marginBottom: 0
    }
})