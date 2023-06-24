import { StyleSheet, View, Text, Image } from "react-native";

const CastCard = ({ cast }) => (
    <View style={styles.castContainer}>
        <Image style={styles.castProfilePicture} source={{ uri: cast?.profilePict }} />
        <Text style={styles.castName}>{cast?.name}</Text>
    </View>
)

const styles = StyleSheet.create({
    castContainer: {
        backgroundColor: "#212529",
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 10,
        alignItems: "center",
    },
    castProfilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'center'
    },
    castName: {
        color: "white",
        fontWeight: "bold",
        marginTop: 4,
    },
})

export default CastCard