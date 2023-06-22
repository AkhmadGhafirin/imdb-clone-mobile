import { StyleSheet, FlatList, Alert } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MovieCard from '../components/MovieCard'
import { useEffect, useState } from "react";
import { errorHelper } from "../helpers/error";
import axios from "axios"

const Home = () => {

    const [movies, setMovies] = useState([])
    const fetchData = async () => {
        try {
            const { data } = await axios.get('https://api-cuisines.akhmadghafirin.com/public/movies')
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