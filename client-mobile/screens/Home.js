import { StyleSheet, FlatList, Alert } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MovieCard from '../components/MovieCard'
import { useEffect, useState } from "react";
import { errorHelper } from "../helpers/error";

const Home = () => {

    const url = 'https://api-cuisines.akhmadghafirin.com/public'
    const [movies, setMovies] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch(url + '/movies')
            if (!response.ok) {
                throw await response.text()
            }
            const data = await response.json()
            setMovies(data)
            console.log(data);
        } catch (err) {
            console.log(errorHelper(err));
            Alert.alert(errorHelper(err))
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={movies}
                    renderItem={({ item }) => <MovieCard movie={item} />}
                    keyExtractor={(item) => item?.id}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
})

export default Home