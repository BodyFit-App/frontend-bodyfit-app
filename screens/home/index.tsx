import { View, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";


export default function HomeScreen() {

    const navigation = useNavigation();
   

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/bodybody2.png')} style={styles.img} />
            <CustomButton style={styles.button} children='Connexion'  onPress={() => navigation.navigate("Login" as never)} />
            <CustomButton style={styles.button} children='Inscription' onPress={() => navigation.navigate("Register" as never)} />
        </View>
    );  
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0B0B12",
    },
    img: {
        width: '90%',
        height: 200,
        marginTop: 150,
        marginBottom: 180, 
    },
    button: {
        marginBottom: 15,
        width: '80%'
    },

    });