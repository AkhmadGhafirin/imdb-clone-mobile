import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { Card, Text, Paragraph } from 'react-native-paper'

const MovieCard = ({ movie }) => {
    const navigation = useNavigation()

    const limitSynopsis = (synopsis) => {
        return synopsis?.length < 200 ? synopsis : `${synopsis?.slice(0, 200)}...`
    }

    return (
        <Card onPress={() => {
            navigation.navigate('Detail', { slug: movie?.slug })
        }} style={styles.cardContainer} theme={{
            roundness: 8,
            isV3: false
        }}>
            <Card.Cover source={{ uri: movie?.imgUrl }} resizeMode='cover' theme={{
                roundness: 8,
                isV3: false
            }} />
            <Card.Content style={styles.cardContent}>
                <Text style={styles.cardTitle} variant="headlineSmall">{movie?.title}</Text>
                <Paragraph style={styles.cardSynopsis}>{limitSynopsis(movie?.synopsis)}</Paragraph>
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
        backgroundColor: "#212529",
    },
    cardContent: {
        marginTop: 10
    },
    cardTitle: {
        color: 'white',
        fontWeight: 'bold'
    },
    cardSynopsis: {
        color: 'white',
        marginTop: 6
    }
})

export default MovieCard