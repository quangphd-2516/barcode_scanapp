import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const Payment = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const totalPrice = route.params?.totalPrice || 0;

    // State để quản lý tab được chọn (Credit card hoặc Apple Pay)
    const [selectedTab, setSelectedTab] = useState("Credit card");

    // State để quản lý thông tin thẻ
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");


    // Hàm xử lý thanh toán (giả lập)
    const handlePayment = () => {
        navigation.navigate("SuccessScreen"); // Quay lại Cart sau khi thanh toán
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#00C853" />
                </TouchableOpacity>
                <View style={styles.header}>
                    <Text style={styles.title}>Checkout</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.totalPrice}>₹ {totalPrice.toLocaleString()}</Text>
                        <Text style={styles.gstText}>Including GST (18%)</Text>
                    </View>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === "Credit card" && styles.activeTab]}
                    onPress={() => setSelectedTab("Credit card")}
                >
                    <Ionicons name="card-outline" size={20} color={selectedTab === "Credit card" ? "#fff" : "#000"} style={styles.tabIcon} />
                    <Text style={[styles.tabText, selectedTab === "Credit card" && styles.activeTabText]}>Credit card</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === "Apple Pay" && styles.activeTab]}
                    onPress={() => setSelectedTab("Apple Pay")}
                >
                    <Ionicons name="logo-apple" size={20} color={selectedTab === "Apple Pay" ? "#fff" : "#000"} style={styles.tabIcon} />
                    <Text style={[styles.tabText, selectedTab === "Apple Pay" && styles.activeTabText]}>Apple Pay</Text>
                </TouchableOpacity>
            </View>

            {/* Form nhập thông tin thẻ (hiển thị khi chọn Credit card) */}
            {selectedTab === "Credit card" && (
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Card number</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={cardNumber}
                            onChangeText={setCardNumber}
                            placeholder="0000 0000 0000 0000"
                            keyboardType="numeric"
                            maxLength={19}
                        />
                        <Ionicons name="card-outline" size={20} color="#000" style={styles.inputIcon} />
                    </View>

                    <Text style={styles.label}>Cardholder name</Text>
                    <TextInput
                        style={styles.inputFieldName} // Thêm style để thấy rõ
                        value={cardHolder}
                        onChangeText={setCardHolder}
                        placeholder="Enter cardholder name"
                    />

                    <View style={styles.row}>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>Expiry date</Text>
                            <TextInput
                                style={styles.inputField}
                                value={expiryDate}
                                onChangeText={setExpiryDate}
                                placeholder="MM / YYYY"
                                keyboardType="numeric"
                                maxLength={9}
                            />
                        </View>
                        <View style={styles.halfInput}>
                            <Text style={styles.label}>CVV / CVC <Ionicons name="help-circle-outline" size={16} color="#00C853" /></Text>
                            <TextInput
                                style={styles.inputField}
                                value={cvv}
                                onChangeText={setCvv}
                                placeholder="123"
                                keyboardType="numeric"
                                maxLength={3}
                            />
                        </View>
                    </View>
                </View>
            )}

            {/* Thông báo email */}
            <Text style={styles.emailText}>
                We will send you an order details to your email after the successful payment
            </Text>

            {/* Nút thanh toán */}
            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.payIcon} />
                <Text style={styles.payButtonText}>Pay for the order</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    headerContainer: {
        backgroundColor: "#fff",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        padding: 20,
        marginBottom: 20,
        height: 253,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    backButton: {
        width: 45,
        height: 44,
        borderRadius: 9,
        backgroundColor: "#F8F8FB",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 70,
        left: 25,
        zIndex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 120,
        marginBottom: 20,

    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1A1A1A",
    },
    priceContainer: {
        alignItems: "flex-end",
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#00C853",
        marginTop: 5,
    },
    gstText: {
        fontSize: 12,
        fontWeight: "normal",
        color: "#7A7A7A",
    },
    tabContainer: {
        top: -50,
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
        marginHorizontal: 20,
        backgroundColor: "#F8F8FB",
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    tab: {
        flex: 1,
        height: 69,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8F8FB",
        paddingVertical: 12,
        borderRadius: 16,
    },
    activeTab: {
        backgroundColor: "#00C853",
    },
    tabIcon: {
        marginRight: 8,
    },
    tabText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#1A1A1A",
    },
    activeTabText: {
        color: "#fff",
    },
    formContainer: {
        top: -30,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "700",
        color: "#3A3C3F",
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8F8FB",
        borderRadius: 12,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 15,
        fontSize: 16,
        color: "#1A1A1A",
    },
    inputFieldName: {
        backgroundColor: "#F8F8FB",
        borderRadius: 12,
        marginBottom: 20,
        height: 50,
    },
    inputIcon: {
        marginRight: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    halfInput: {
        flex: 1,
        marginHorizontal: 5,
    },
    inputField: {
        backgroundColor: "#F8F8FB",
        borderRadius: 12,
        marginBottom: 20,
        height: 50,
    },
    emailText: {
        fontSize: 14,
        color: "#7A7A7A",
        textAlign: "center",
        marginBottom: 20,
    },
    payButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00C853",
        paddingVertical: 16,
        borderRadius: 16,
        marginTop: 30,
        height: 60,
        marginHorizontal: 20
    },
    payIcon: {
        marginRight: 8,
    },
    payButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        letterSpacing: 0.5,
    },

});

export default Payment;