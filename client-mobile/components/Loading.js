import { ActivityIndicator, View, StyleSheet } from "react-native"

const Loading = () => (
    <View style={styles.container}>
        <ActivityIndicator color={'#FFC107'} size={'large'} />
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center'
    }
})

export default Loading