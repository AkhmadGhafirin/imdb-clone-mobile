// import { StyleSheet, View, Text, Image, ScrollView } from "react-native"
// import { Button } from "react-native-paper";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// const Detail = ({ route }) => {
//     return (
//         <SafeAreaProvider>
//             <SafeAreaView style={styles.container}>
//                 <ScrollView>
//                     <Image
//                         style={styles.img}
//                         source={{ uri: 'https://m.media-amazon.com/images/M/MV5BNzQ1ODUzYjktMzRiMS00ODNiLWI4NzQtOTRiN2VlNTNmODFjXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX600_.jpg' }}
//                     />
//                     <View style={styles.content}>
//                         <Button textColor='black' buttonColor='#FFC107' mode='contained'>Watch Trailer</Button>
//                         <View style={styles.titleContainer}>
//                             <Text style={styles.textTitle}>SPIDER-MAN: ACROSS THE SPIDER-VERSE</Text>
//                             <View style={styles.tagContainer}>
//                                 <Text style={styles.tagText}>Comedy</Text>
//                             </View>
//                         </View>
//                         <Text style={styles.textLabel}>Synopsis:</Text>
//                         <Text style={styles.textSynopsis}>Miles Morales returns for the next chapter of the Oscar®-winning Spider-Verse saga, an epic adventure that will transport Brooklyn's full-time, friendly neighborhood Spider-Man across the Multiverse to join forces with Gwen Stacy and a new team of Spider-People to face off with a villain more powerful than anything they have ever encountered.</Text>
//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
//         </SafeAreaProvider>
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#000000'
//     },
//     content: {
//         padding: 16
//     },
//     img: { height: 500, resizeMode: "cover" },
//     titleContainer: {
//         marginTop: 26,
//         flexDirection: 'row',
//         alignItems: 'flex-start',
//     },
//     textTitle: {
//         flex: 1,
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: 16,
//     },
//     textLabel: {
//         color: 'white',
//         fontWeight: '900',
//         fontSize: 20,
//         marginTop: 16
//     },
//     textSynopsis: {
//         color: 'white',
//         marginTop: 6
//     },
//     tagContainer: {
//         borderRadius: 16,
//         backgroundColor: '#FFC107',
//         paddingVertical: 4,
//         paddingHorizontal: 8,
//         flexShrink: 1,
//     },
//     tagText: {
//         color: 'black',
//         fontWeight: 'bold'
//     }
// });

// export default Detail


import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, FlatList, Linking } from "react-native";
import { Button, Avatar } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Detail = ({ route }) => {
    const castData = [
        { id: "1", name: "Actor 1", profilePicture: "https://m.media-amazon.com/images/M/MV5BMjAwNDU2OTc5M15BMl5BanBnXkFtZTgwOTk0ODMyNDE@._V1_.jpg" },
        { id: "2", name: "Actor 2", profilePicture: "https://m.media-amazon.com/images/M/MV5BMjAwNDU2OTc5M15BMl5BanBnXkFtZTgwOTk0ODMyNDE@._V1_.jpg" },
        { id: "3", name: "Actor 3", profilePicture: "https://m.media-amazon.com/images/M/MV5BMjAwNDU2OTc5M15BMl5BanBnXkFtZTgwOTk0ODMyNDE@._V1_.jpg" },
        { id: "4", name: "Actor 3", profilePicture: "https://m.media-amazon.com/images/M/MV5BMjAwNDU2OTc5M15BMl5BanBnXkFtZTgwOTk0ODMyNDE@._V1_.jpg" },
        { id: "5", name: "Actor 3", profilePicture: "https://m.media-amazon.com/images/M/MV5BMjAwNDU2OTc5M15BMl5BanBnXkFtZTgwOTk0ODMyNDE@._V1_.jpg" },
        { id: "6", name: "Actor 3", profilePicture: "https://m.media-amazon.com/images/M/MV5BMjAwNDU2OTc5M15BMl5BanBnXkFtZTgwOTk0ODMyNDE@._V1_.jpg" },
        { id: "7", name: "Actor 3", profilePicture: "https://m.media-amazon.com/images/M/MV5BMjAwNDU2OTc5M15BMl5BanBnXkFtZTgwOTk0ODMyNDE@._V1_.jpg" },
        { id: "8", name: "Actor 3", profilePicture: "https://m.media-amazon.com/images/M/MV5BMjAwNDU2OTc5M15BMl5BanBnXkFtZTgwOTk0ODMyNDE@._V1_.jpg" },
        { id: "9", name: "Actor 3", profilePicture: "https://m.media-amazon.com/images/M/MV5BMjAwNDU2OTc5M15BMl5BanBnXkFtZTgwOTk0ODMyNDE@._V1_.jpg" },
        { id: "10", name: "Actor 3", profilePicture: "https://m.media-amazon.com/images/M/MV5BMjAwNDU2OTc5M15BMl5BanBnXkFtZTgwOTk0ODMyNDE@._V1_.jpg" },
        { id: "11", name: "Actor 3", profilePicture: "https://m.media-amazon.com/images/M/MV5BMjAwNDU2OTc5M15BMl5BanBnXkFtZTgwOTk0ODMyNDE@._V1_.jpg" },
    ];

    const onClickWatchTrailer = () => {
        Linking.openURL('https://www.youtube.com/watch?v=shW9i6k8cB0')
    }

    const renderCastItem = ({ item }) => (
        <View style={styles.castItem}>
            <Image style={styles.profilePicture} source={{ uri: item.profilePicture }} />
            {/* <Avatar.Image style={styles.profilePicture} source={{ uri: item?.profilePicture }} size={100} /> */}
            <Text style={styles.castName}>{item.name}</Text>
        </View>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Image
                        style={styles.img}
                        source={{
                            uri: "https://m.media-amazon.com/images/M/MV5BNzQ1ODUzYjktMzRiMS00ODNiLWI4NzQtOTRiN2VlNTNmODFjXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX600_.jpg",
                        }}
                    />
                    <View style={styles.content}>
                        <Button textColor="black" buttonColor="#FFC107" mode="contained" onPress={onClickWatchTrailer}>
                            Watch Trailer
                        </Button>
                        <View style={styles.titleContainer}>
                            <Text style={styles.textTitle}>SPIDER-MAN: ACROSS THE SPIDER-VERSE</Text>
                            <View style={styles.tagContainer}>
                                <Text style={styles.tagText}>Comedy</Text>
                            </View>
                        </View>
                        <Text style={styles.textLabel}>Synopsis</Text>
                        <Text style={styles.textSynopsis}>
                            Miles Morales returns for the next chapter of the Oscar®-winning Spider-Verse saga, an epic adventure
                            that will transport Brooklyn's full-time, friendly neighborhood Spider-Man across the Multiverse to join
                            forces with Gwen Stacy and a new team of Spider-People to face off with a villain more powerful than
                            anything they have ever encountered.
                        </Text>
                        <Text style={styles.textLabel}>Casts</Text>
                        <FlatList
                            data={castData}
                            renderItem={renderCastItem}
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
    },
    castItem: {
        backgroundColor: "#212529",
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 10,
        alignItems: "center",
    },
    profilePicture: {
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
});

export default Detail;
