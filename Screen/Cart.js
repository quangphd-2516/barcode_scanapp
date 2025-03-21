import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ item, onIncrease, onDecrease }) => (
    <View style={styles.productItem}>
        <Image source={item.image} style={styles.productImage} />
        <View style={styles.productDetails}>
            <Text style={styles.owner}>{item.owner}</Text>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>₹{item.price}</Text>
        </View>
        <View style={styles.quantityControl}>
            <TouchableOpacity onPress={() => onDecrease(item.id)}>
                <Ionicons name="remove" size={20} color="#F08F5F" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => onIncrease(item.id)}>
                <Ionicons name="add" size={20} color="#F08F5F" />
            </TouchableOpacity>
        </View>
    </View>
);

const Cart = () => {
    const navigation = useNavigation();

    const [cartItems, setCartItems] = useState([
        { id: "1", owner: "Lauren’s", name: "Orange Juice", price: 149, quantity: 3, image: require("../assets/juice.png") },
        { id: "2", owner: "Lauren’s", name: "Skimmed Milk", price: 149, quantity: 3, image: require("../assets/Skimmed_milk.png") },
        { id: "3", owner: "Lauren’s", name: "Aloe Vera Lotion", price: 149, quantity: 3, image: require("../assets/Aloe_Vera_Lotion.png") },
        { id: "4", owner: "Lauren’s", name: "Orange Juice", price: 149, quantity: 3, image: require("../assets/juice.png") },
        { id: "5", owner: "Lauren’s", name: "Skimmed Milk", price: 149, quantity: 3, image: require("../assets/Skimmed_milk.png") },
        { id: "6", owner: "Lauren’s", name: "Aloe Vera Lotion", price: 149, quantity: 3, image: require("../assets/Aloe_Vera_Lotion.png") },
    ]);

    // Hàm tăng số lượng
    const handleIncrease = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Hàm giảm số lượng (không cho dưới 1)
    const handleDecrease = (id) => {
        setCartItems((prevItems) =>
            prevItems
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color="#F08F5F" />
            </TouchableOpacity>
            <Text style={styles.title}>Your Cart</Text>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                    <ProductItem
                        item={item}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                    />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.productList}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalPrice}>₹{totalPrice.toLocaleString()}</Text>
            </View>
            <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => navigation.navigate("Payment", { totalPrice })}
            >
                <Text style={styles.checkoutButtonText}>Proceed to checkout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
        padding: 20,
    },
    backButton: {
        width: 45,
        height: 44,
        borderRadius: 9,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 70,
        left: 25,
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1A1A1A",
        marginTop: 120,
        marginBottom: 20,
        textAlign: "left",
    },
    productList: {
        paddingBottom: 130,
    },
    productItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 16,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        height: 60,
        width: 60,
        borderRadius: 12,
        marginRight: 15,
    },
    productDetails: {
        flex: 1,
    },
    owner: {
        fontSize: 12,
        color: "#7A7A7A",
        marginBottom: 2,
    },
    productName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1A1A1A",
    },
    productPrice: {
        fontSize: 14,
        color: "#F08F5F",
        fontWeight: "500",
        marginTop: 4,
    },
    quantityControl: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F0F0F5",
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    quantityText: {
        marginHorizontal: 8,
        fontSize: 16,
        fontWeight: "500",
        color: "#333333",
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
        paddingHorizontal: 4,
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1A1A1A",
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#F08F5F",
    },
    checkoutButton: {
        backgroundColor: "#F08F5F",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        shadowColor: "#5A6CF3",
        marginBottom: 80,
    },
    checkoutButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
});

export default Cart;