import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SuccessScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="#3b82f6" />
            </TouchableOpacity>


            <Image style={styles.image} source={require("../assets/Success.png")} />

            <Text style={styles.successText}>Payment Success, Yayy!</Text>
            <Text style={styles.infoText}>
                We will send order details and invoice in your contact no. and registered email
            </Text>

            <TouchableOpacity>
                <Text style={styles.link}>Check Details →</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.downloadText}>Download Invoice</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
    backButton: { width: 45, height: 44, borderRadius: 9, backgroundColor: "#F8F8FB", alignItems: "center", justifyContent: "center", position: "absolute", top: 70, left: 25, zIndex: 1 },
    image: { width: 200, height: 200, marginBottom: 20 },
    successText: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
    infoText: { fontSize: 16, color: "#6b7280", textAlign: "center", marginBottom: 20 },
    link: { fontSize: 16, color: "#007bff", marginBottom: 20 },
    downloadButton: { backgroundColor: "#3b82f6", paddingVertical: 12, paddingHorizontal: 40, borderRadius: 10 },
    downloadText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default SuccessScreen;