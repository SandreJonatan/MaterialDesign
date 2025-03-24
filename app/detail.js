import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Detail() {
  const router = useRouter();
  const { id, name, description, image } = useLocalSearchParams(); // Ambil parameter dari catalog.js

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", alignItems: "center", justifyContent: "center", padding: 20 },
  image: { width: 250, height: 250, borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  backButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#6200EE", padding: 10, borderRadius: 6 },
  backText: { color: "white", fontSize: 16, marginLeft: 5 },
});
