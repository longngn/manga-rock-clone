import React from 'react'
import { View, ListView, Image, Text, StyleSheet, TouchableHighlight } from 'react-native';

const renderRow = ({ thumbnail, title, onPress }, sectionId, rowId) => (
    <TouchableHighlight onPress={onPress}>
        <View style={styles.rowContainer}>
            <Text style={styles.rowNumber}>{Number(rowId) + 1}</Text>
            <Image source={{uri: thumbnail}} style={styles.thumbnail}/>
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
            </View>
        </View>
    </TouchableHighlight>
)

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.mangaId !== r2.mangaId })
const MangaList = ({ mangas, onMangaPress }) => {
    mangas = mangas.map(manga => ({
        ...manga,
        onPress: () => onMangaPress(manga.mangaId)
    }))

    return <ListView 
        renderRow={renderRow}
        dataSource={ds.cloneWithRows(mangas)}
        style={styles.container}
    />
}

import colors from '../config/colors'
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
    },
    rowContainer: {
        flex: 1,
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.separator,
        borderBottomWidth: 0.3
    },
    rowNumber: {
        color: colors.title,
        padding: 15
    },
    thumbnail: {
        width: 57,
        height: 85
    },
    info: {
        flex: 1,
        paddingLeft: 15
    },
    title: {
        color: colors.title,
    }
})

export default MangaList