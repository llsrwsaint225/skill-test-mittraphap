import React, { useState, useEffect  } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Image } from "react-native";
import { ThemedText } from "./ThemedText";
import { TouchableHighlight, TouchableOpacity, Alert } from "react-native";

// Firebase
import { db } from "../constants/firebaseConfig";
import { ref, onValue } from "firebase/database";

export function NewUser() {
  const [customerData, setCustomerData] = useState<any[]>([]);
  const [moneyPlanedPerson, setMoneyPlanedPerson] = useState<any[]>([]);
  const [header, setheader] = useState<{ adjustPlan: string; newUserHeader: string; planBeginButton: string; planedUserHeader: string; seeSummaryPlan: string }>({
    adjustPlan: "",
    newUserHeader: "",
    planBeginButton: "",
    planedUserHeader: "",
    seeSummaryPlan: ""
  });

  useEffect(() => {
    const customerRef = ref(db, "customers");
    const plannedRef = ref(db, "plannedCustomers");
    const labelRef = ref(db, "labelMapping/mainScreen");

    const unsubscribeCustomer = onValue(customerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCustomerData(Object.values(data));
      }
    });

    const unsubscribePlanned = onValue(plannedRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMoneyPlanedPerson(Object.values(data));
      }
    });
 
    const headerLabels = onValue(labelRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setheader({
          adjustPlan: data.adjustPlan,
          newUserHeader: data.newUserHeader,
          planBeginButton: data.planBeginButton,
          planedUserHeader: data.planedUserHeader,
          seeSummaryPlan: data.seeSummaryPlan
        });
      }
    });

    return () => {
      unsubscribeCustomer();
      unsubscribePlanned();
      headerLabels();
    };
  }, []);
  const onPress = () => {
      Alert.alert("You tapped the button!");
  };
  return (
    <View style={[styles.container]}>
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <View>
            <ThemedText style={[styles.header]}>
              {header.newUserHeader}
            </ThemedText>
          </View>
          <View style={[styles.border]}></View>
        </View>
        {customerData.map((item, index) => (
          <View key={index} style={[styles.customerData]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../assets/images/Customer Icon.svg")}
                style={[styles.imgPerson]}
              />
              <ThemedText style={[styles.text]}>{item.customerName}</ThemedText>
            </View>
            <TouchableHighlight
              onPress={onPress}
              underlayColor="white"
              style={[styles.button]}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../assets/images/arrowIcon.svg")}
                  style={[styles.imgButton]}
                />
                <ThemedText style={[styles.textButton]}>{header.planBeginButton}</ThemedText>
              </View>
            </TouchableHighlight>
          </View>
        ))}
      </View>
      <View>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          <ThemedText style={[styles.header]}>{header.planedUserHeader}</ThemedText>
          <View style={[styles.border]}></View>
        </View>
        {moneyPlanedPerson.map((item, index) => (
          <View key={index} style={[styles.customerData]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../assets/images/fluffyDog.svg")}
                style={[styles.imgReal]}
              />
              <ThemedText style={[styles.text]}>{item.customerName}</ThemedText>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={onPress} style={styles.buttonOpacity}>
                <Image
                  source={require("../assets/images/writeIcon.svg")}
                  style={styles.buttonIcon}
                />
                <ThemedText style={[styles.textButtonOpacity]}>
                  {header.adjustPlan}
                </ThemedText>
              </TouchableOpacity>
              <TouchableHighlight
                onPress={onPress}
                underlayColor="white"
                style={[styles.button]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../assets/images/paperIcon.svg")}
                    style={[styles.imgButtonPaper]}
                  />
                  <ThemedText style={[styles.textButton]}>
                    {header.seeSummaryPlan}
                  </ThemedText>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginInline: 40,
    flexDirection: "column",
  },
  header: {
    color: "#8A8C8B",
    fontFamily: "IBMPlexSansThai-Medium",
    fontSize: 14,
    marginRight: 30,
    marginLeft: 14
  },
  border: {
    borderBottomWidth: 2,
    borderBottomColor: "#F1F3F0",
    flex: 1,
    marginBottom: 12,
  },
  customerData: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 14,
    marginBottom: 20,
    justifyContent: 'space-between'
  },
  imgPerson: {
    width: 50,
    height: 50,
    marginRight: 30
  },
  imgReal:{
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 30
  },
  text: {
    fontFamily: 'IBMPlexSansThai-Bold',
    color: '#456455'
  },
  button: {
    padding: 7, // เพิ่ม padding เพื่อให้แตะง่ายขึ้น
    width: 200,
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: '#1F87AA',
    borderRadius: 10,
    justifyContent: 'center'
  },
  buttonOpacity: {
    padding: 7, // เพิ่ม padding เพื่อให้แตะง่ายขึ้น
    width: 150,
    flexDirection: "row",
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center'
  },
  textButtonOpacity: {
    fontSize: 16,
    marginTop: 2,
    fontFamily: 'IBMPlexSansThai-Medium',
    color: '#1F87AA'
  },
  imgButton: {
    width: 15,
    height: 15,
    marginRight: 20
  },
  imgButtonPaper: {
    width: 15,
    height: 20,
    marginRight: 20
  },
  textButton: {
    fontSize: 16,
    marginTop: 2,
    fontFamily: 'IBMPlexSansThai-Bold',
    color: 'white'
  },
  buttonIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 10
  },
  

});
