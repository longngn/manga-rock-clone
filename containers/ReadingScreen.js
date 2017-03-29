import React from 'react'
import Gallery from 'react-native-gallery'
import { StyleSheet } from 'react-native';
import { getChapter } from '../ducks/mangas'
import { connect } from 'react-redux'

let Reading = ({ getChapter, navigation }) => {
    const { mangaId, chapterNumber } = navigation.state.params
    const images = getChapter(mangaId, chapterNumber)
    return <Gallery
        style={styles.container}
        images={images}
    />
}
Reading = connect(state => ({
    getChapter: (mangaId, chapterNumber) => getChapter(state.mangas, mangaId, chapterNumber)
}))(Reading)

import colors from '../config/colors'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        backgroundColor: colors.navigator
    },
})

Reading.navigationOptions = {
    header: {
        style: styles.header
        //visible: false
    }
}

export default Reading