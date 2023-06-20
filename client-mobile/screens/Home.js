import { StyleSheet } from 'react-native';
import { FlatList, Text, View } from "react-native"
import { Button } from 'react-native-paper';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* <FlatList /> */}
            <Text style={{ color: 'white' }}>Home</Text>
            <Button mode='contained' style={{ marginTop: 20.0 }} onPress={() => navigation.navigate('Detail')}>Go Detail</Button>
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

export default Home