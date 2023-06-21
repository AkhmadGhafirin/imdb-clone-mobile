import { StyleSheet, FlatList, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MovieCard from '../components/MovieCard'
import { useEffect, useState } from "react";

const Home = () => {

    const url = 'https://090a-27-50-29-117.ap.ngrok.io'
    const [movies, setMovies] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch(url + '/movies')
            const data = await response.json()
            setMovies(data)
        } catch (err) {
            console.log(err);
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
});

export default Home