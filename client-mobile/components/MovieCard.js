import { useNavigation } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { Card, Text, Title, Paragraph } from 'react-native-paper'

const MovieCard = ({ movie }) => {
    const navigation = useNavigation()

    return (
        <Card onPress={() => {
            navigation.navigate('Detail')
        }} style={{ margin: 10 }} theme={{
            roundness: 8,
            isV3: false
        }}>
            <Card.Cover source={{ uri: movie?.imgUrl }} resizeMode='cover' theme={{
                roundness: 8,
                isV3: false
            }} />
            <Card.Content>
                <Text variant="titleLarge">Card title </Text>
                <Title variant="titleLarge">Card title </Title>
                <Paragraph>Card content</Paragraph>
            </Card.Content>
        </Card>
    )
}

export default MovieCard