import React from 'react'
import { ListView, Image, Text, StyleSheet, View, TouchableHighlight } from 'react-native';

const groupBy3 = (array) => {
    let res = [], i, j
    for(i = 0; i < array.length; i += 3) {
        let group = []
        for(j = i; j < Math.min(i + 3, array.length); j += 1) {
            group.push(array[j])
        }
        res.push(group)
    }
    return res
}

const MangaItem = ({ title, thumbnail, onPress }) => (
    <TouchableHighlight onPress={onPress} style={{flex: 1}}>
        <View style={{flex: 1}}>
            <Image style={styles.thumbnail} source={{uri: thumbnail}} />
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
        </View>
    </TouchableHighlight>

)

const renderRow = ({ mangaGroup, onMangaPress }) => (
    <View style={styles.row}>
        {mangaGroup.map(({ manga_id, thumbnail, title }) => 
            <View key={manga_id} style={styles.item}>
                <MangaItem 
                    title={title}
                    thumbnail={thumbnail}
                    onPress={() => onMangaPress(manga_id)}
                />
            </View>
        )}
    </View>
)

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1[0].manga_id !== r2[0].manga_id })
const MangaCollection = ({ mangas, onMangaPress }) => {
    mangas = groupBy3(mangas)
    mangas = mangas.map(mangaGroup => ({
        mangaGroup,
        onMangaPress
    }))

    return <ListView
        renderRow={renderRow}
        dataSource={ds.cloneWithRows(mangas)}
        style={styles.container}
    />
}

import colors from '../../config/colors'
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    item: {
        flex: 1,
        aspectRatio: 0.6,
        padding: 5,
        alignItems: 'center'
    },
    thumbnail: {
        flex: 1,
        aspectRatio: 0.66,
    },
    title: {
        fontSize: 10,
        color: colors.title,
        height: 25,
        marginTop: 5
    }
})

export default MangaCollection