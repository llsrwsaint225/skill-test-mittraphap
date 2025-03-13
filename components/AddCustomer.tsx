import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, TouchableHighlight, Alert, TextInput } from "react-native";
import { SearchBar } from "./SearchBar";
import { ThemedText } from "./ThemedText";

// Firebase
import { db } from "../constants/firebaseConfig";
import { ref, push, onValue } from "firebase/database";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddCustomer: React.FC<CustomModalProps> = ({ visible, onClose }) => {
  const [customerName, setCustomerName] = useState("");
  const [header, setheader] = useState<{ closeButton: string; headerText: string; saveButton: string }>({
    closeButton: "",
    headerText: "",
    saveButton: ""
    });

  useEffect(() => {
      const labelRef = ref(db, "labelMapping/addCustomerPopup");
   
      const headerLabels = onValue(labelRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setheader({
            closeButton: data.closeButton,
            headerText: data.headerText,
            saveButton: data.saveButton
          });
        }
      });
  
      return () => {
        headerLabels();
      };
    },
  []);

  const saveCustomerToFirebase = () => {
    if (!customerName.trim()) {
      Alert.alert("แจ้งเตือน", "กรุณากรอกชื่อลูกค้า");
      return;
    }

    const customersRef = ref(db, "customers"); //อ้างอิงไปที่ 'customers'
    
    push(customersRef, { customerName })//เพิ่มข้อมูลใหม่
      .then(() => {
        Alert.alert("สำเร็จ", "เพิ่มลูกค้าเรียบร้อยแล้ว!"); 
        setCustomerName(""); //เคลียร์ TextInput
        onClose(); //ปิด Popup
      })
      .catch((error) => {
        Alert.alert("ผิดพลาด", error.message);
      });
  };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={[styles.header]}>
            <Text style={styles.modalText}>{header.headerText}</Text>
            <TouchableOpacity onPress={onClose}>
              <Image
                source={require("../assets/images/closeIcon.svg")}
                style={styles.closeButton}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.searchBox]} pointerEvents="box-none">
            {/* Search Icon */}
            <Image
              source={require("../assets/images/person.svg")}
              style={styles.searchIcon}
            />
            {/* Input Field */}
            <TextInput
              style={styles.searchInput}
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>

          {/* ปุ่ม */}
          <View style={[styles.buttonSection]}>
            <View style={{width:' 50%'}}>
              <TouchableOpacity onPress={onClose} style={styles.buttonOpacity}>
                <ThemedText style={styles.textButtonOpacity}>{header.closeButton}</ThemedText>
              </TouchableOpacity>
            </View>
            <View style={{ width:' 50%', marginBottom: 30 }}>
              <TouchableHighlight
                onPress={saveCustomerToFirebase}
                underlayColor="white"
                style={styles.button}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../assets/images/check.svg")}
                    style={styles.imgButton}
                  />
                  <ThemedText style={styles.textButton}>{header.saveButton}</ThemedText>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 21,
        alignItems: "center",
        marginBottom: 30,
        marginTop: 10,
      },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      width: "80%",
      maxWidth: 492,
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
    },
    modalText: {
      fontSize: 18,
      textAlign: "center",
      marginBottom: 10,
      fontFamily: "IBMPlexSansThai-Bold",
      color: "#004C65"
    },
    closeButton: {
        width: 20,
        height: 20
    },
    buttonText: {
      color: "gray",
      fontSize: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonSection: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        marginTop: 20
    },
    button: {
        padding: 7,
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: '#1F87AA',
        borderRadius: 10,
        justifyContent: 'center'
    },
    imgButton: {
        width: 15,
        height: 15,
        marginRight: 15
    },
    textButton: {
        fontSize: 16,
        marginTop: 2,
        fontFamily: 'IBMPlexSansThai-Bold',
        color: 'white'
      },
      buttonOpacity: {
        padding: 7,
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
      },
      saveButton: {
        flexDirection: "row",
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
      },
      textButtonOpacity: {
        fontSize: 16,
        marginTop: 2,
        fontFamily: 'IBMPlexSansThai-Bold',
        color: '#456455'
      },
      input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 20,
      },
      searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 10,
        height: 20,
        padding: 21,
        marginTop: 10,
      },
      searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
      },
      searchInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'IBMPlexSansThai-Medium'
      },
  });
  
