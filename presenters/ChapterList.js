import React from 'react'
import { ListView, Text, TouchableHighlight, StyleSheet } from 'react-native'
import colors from '../config/colors'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const ChapterList = ({ mangaTitle, numberOfChapters, onChapterPress }) => {
    const rowsData = Array.from(Array(numberOfChapters).keys()).reverse()
    return (
        <ListView 
            style={styles.container}
            dataSource={ds.cloneWithRows(rowsData)}
            renderRow={chapterNumber => (
                <TouchableHighlight style={styles.row} onPress={() => onChapterPress(chapterNumber)}>
                    <Text style={styles.title}>{mangaTitle} {chapterNumber + 1}</Text>
                </TouchableHighlight>
            )}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background
    },
    row: {
        borderBottomColor: colors.separator,
        borderBottomWidth: 0.3,
        height: 45,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'center'
    },
    title: {
        color: colors.title,
        fontSize: 14
    }
})

export default ChapterList