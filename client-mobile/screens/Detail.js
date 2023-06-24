import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, FlatList, Linking, Alert } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CastCard from "../components/CastCard"
import { useQuery } from "@apollo/client";
import { GET_MOVIE } from "../config/queries";
import Loading from "../components/Loading";
import { errorHelper } from "../helpers/error";

const Detail = ({ route }) => {
    const { id } = route.params

    const { loading, data, error } = useQuery(GET_MOVIE, {
        variables: {
            movieId: +id
        },
    });

    const [movie, setMovie] = useState({})

    useEffect(() => {
        setMovie(data?.movie || {})
    }, [data])

    const onClickWatchTrailer = () => {
        Linking.openURL(movie?.trailerUrl)
    }

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
                <ScrollView>
                    <Image
                        style={styles.img}
                        source={{
                            uri: movie?.imgUrl,
                        }}
                    />
                    <View style={styles.content}>
                        <Button textColor="black" buttonColor="#FFC107" mode="contained" onPress={onClickWatchTrailer}>
                            Watch Trailer
                        </Button>
                        <View style={styles.titleContainer}>
                            <Text style={styles.textTitle}>{movie?.title}</Text>
                            <View style={styles.tagContainer}>
                                <Text style={styles.tagText}>{movie?.Genre?.name}</Text>
                            </View>
                        </View>
                        <Text style={styles.textLabel}>Synopsis</Text>
                        <Text style={styles.textSynopsis}>
                            {movie?.synopsis}
                        </Text>
                        <Text style={styles.textLabel}>Author</Text>
                        <Text style={styles.textTitle}>
                            {movie?.Author?.username}
                        </Text>
                        <Text style={styles.textLabel}>Casts</Text>
                        <FlatList
                            data={movie?.Casts}
                            renderItem={({ item }) => <CastCard cast={item} />}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.castList}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    content: {
        padding: 16,
    },
    img: { height: 500, resizeMode: "cover" },
    titleContainer: {
        marginTop: 26,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    textTitle: {
        flex: 1,
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
    textLabel: {
        color: "white",
        fontWeight: "900",
        fontSize: 20,
        marginTop: 16,
    },
    textSynopsis: {
        color: "white",
        marginTop: 6,
    },
    tagContainer: {
        borderRadius: 16,
        backgroundColor: "#FFC107",
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexShrink: 1,
    },
    tagText: {
        color: "black",
        fontWeight: "bold",
    },
    castList: {
        marginTop: 10,
    }
})

export default Detail
