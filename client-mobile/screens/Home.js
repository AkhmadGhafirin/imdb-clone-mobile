import { StyleSheet, FlatList, Alert, ActivityIndicator, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MovieCard from '../components/MovieCard'
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MOVIES } from "../config/queries";
import Loading from "../components/Loading";
import { errorHelper } from "../helpers/error";

const Home = () => {
    const { loading, data, error } = useQuery(GET_MOVIES)
    const [movies, setMovies] = useState([])

    useEffect(() => {
        setMovies(data?.movies || [])
    }, [data])

    if (loading) {
        return (
            <Loading />
        )
    }

    if (error) {
        Alert.alert(errorHelper(error))
    }

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
    }
})

export default Home