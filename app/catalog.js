import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Animated, TouchableWithoutFeedback } from "react-native";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Catalog() {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  const catalogData = [
    { id: "1", name: "Laptop", image: require("../assets/images/laptop.jpg"), description: "Laptop gaming dengan spesifikasi tinggi." },
    { id: "2", name: "HP", image: require("../assets/images/hp.jpg"), description: "Smartphone dengan kamera terbaik." },
    { id: "3", name: "Keyboard", image: require("../assets/images/keyboard.jpg"), description: "Keyboard mekanikal RGB untuk gaming." },
    { id: "4", name: "Mouse Gaming", image: require("../assets/images/mouse.jpg"), description: "Mouse gaming dengan DPI tinggi." },
    { id: "5", name: "Power Bank", image: require("../assets/images/powerbank.jpg"), description: "Power bank 10.000 mAh dengan fast charging." },
    { id: "6", name: "Casing HP", image: require("../assets/images/casing_hp.jpg"), description: "Casing HP berkualitas tinggi dengan perlindungan ekstra." },
    { id: "7", name: "Charger HP", image: require("../assets/images/charger_hp.jpg"), description: "Charger HP fast charging 20W." },
    { id: "8", name: "Headset", image: require("../assets/images/headset.jpg"), description: "Headset dengan suara jernih dan noise cancellation." },
  ];

  const toggleProfileMenu = () => {
    if (profileOpen) {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setProfileOpen(false));
    } else {
      setProfileOpen(true);
      Animated.timing(slideAnim, {
        toValue: 60,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeDropdown = () => {
    if (profileOpen) {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setProfileOpen(false));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Katalog Produk</Text>
          <View>
            <TouchableOpacity onPress={toggleProfileMenu} style={styles.profileButton}>
              <Image source={require("../assets/images/profile.png")} style={styles.profileIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {profileOpen && (
          <Animated.View style={[styles.profileMenu, { top: slideAnim }]}>
            <Text style={styles.username}>Pengguna</Text>
            <TouchableOpacity onPress={() => router.replace("/")} style={styles.logoutButton}>
              <MaterialIcons name="logout" size={20} color="white" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <FlatList
          data={catalogData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => router.push({ pathname: "/detail", params: { id: item.id, name: item.name, description: item.description, image: item.image } })}
            >
              <Image source={item.image} style={styles.image} />
              <Text style={styles.productName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5"},
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 15, backgroundColor: "#fff", elevation: 4, zIndex: 9999 },
  title: { fontSize: 20, fontWeight: "bold" },

  profileButton: { padding: 5 },
  profileIcon: { width: 40, height: 30, borderRadius: 20 },

  profileMenu: {
    position: "absolute",
    right: 8,
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 8,
    width: 140,
    elevation: 5,
    zIndex: 999,
  },
  username: { color: "white", fontSize: 16, textAlign: "center", marginBottom: 8 },
  logoutButton: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: "#E53935", padding: 8, borderRadius: 6, marginTop: 1 },
  logoutText: { color: "white", fontSize: 14, marginLeft: 5 },

  itemContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFF", marginHorizontal: 15, marginVertical: 8, padding: 10, borderRadius: 10, elevation: 3 },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  productName: { fontSize: 18, fontWeight: "bold" },
});
