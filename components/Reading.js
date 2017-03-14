import React from 'react'
import Gallery from 'react-native-gallery'
import { StyleSheet } from 'react-native';
import { getChapter } from '../ducks/mangas'
import { connect } from 'react-redux'

let Reading = ({ getChapter, navigation }) => {
    const { manga_id, chapterId } = navigation.state.params
    const images = getChapter(manga_id, chapterId)
    return <Gallery
        style={styles.container}
        images={images}
    />
}
Reading.navigationOptions = {
    header: {
        //visible: false
    }
}
Reading = connect(state => ({
    getChapter: (manga_id, chapterId) => getChapter(state.mangas, manga_id, chapterId)
}))(Reading)

import colors from '../config/colors'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    }
})

export default Reading