import { StyleSheet } from 'react-native';
import { View, Text } from "react-native"

const Detail = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <Text style={{ color: 'white' }}>Detail</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Detail