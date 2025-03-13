import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, Image, ViewStyle } from "react-native";

interface SearchBarProps {
  style?: ViewStyle; // รับ props style
}

export function SearchBar({ style }: SearchBarProps) {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={[styles.searchBox, style]} pointerEvents="box-none">
      {/* Search Icon */}
      <Image source={require("../assets/images/person.svg")} style={styles.searchIcon} />
      {/* Input Field */}
      <TextInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    height: 20,
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
