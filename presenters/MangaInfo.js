import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import ReadButton from './ReadButton'
import ButtonGroup from './ButtonGroup';
import ChapterList from './ChapterList'
import { MangaListConnected } from '../containers/mangasContainers'

class MangaInfo extends React.Component {
    state = {
        selectedIndex: 0
    }
    updateIndex = (selectedIndex) => { 
        this.setState({ selectedIndex })
    }
    render() {
        const { 
            title, 
            numberOfChapters, 
            thumbnail, 
            description, 
            relatedMangas, 
            onMangaPress, 
            onChapterPress 
        } = this.props

        let bottomView 
        switch (this.state.selectedIndex) {
            case 0:
                bottomView = (
                    <View>
                        <Text style={styles.title}>Description</Text>
                        <Text style={styles.subtitle}>{description}</Text>
                    </View>
                )
                break
            case 1:
                bottomView = <ChapterList 
                    mangaTitle={title} 
                    numberOfChapters={numberOfChapters} 
                    onChapterPress={onChapterPress}
                />
                break
            case 2:
                bottomView = <MangaListConnected
                    mangaIds={relatedMangas}
                    onMangaPress={onMangaPress}
                />
                break
            default:
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <Image style={styles.cardThumbnail} source={{uri: thumbnail}}></Image>
                    <View style={styles.cardInfo}>
                        <Text style={[styles.title, styles.mangaTitle]}>{title}</Text>
                        <View style={styles.cardInfoBottomContainer}>
                            <View style={styles.mangaStatusContainer}>
                                <Text style={styles.subtitle}>{numberOfChapters} Chapter{numberOfChapters>1? 's':''}</Text>
                            </View>
                            <ReadButton title='READ'/>
                        </View>
                    </View>
                </View>

                <ButtonGroup
                    buttons={['Info', 'Chapters', 'Related']}
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                />

                <View style={styles.bottomContainer}>
                    {bottomView}
                </View>
            </ScrollView>
        ) 
    }
}

import colors from '../config/colors'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: colors.background
    },
    card: {
        flex: 0,
        flexDirection: 'row',
        height: 120,
        marginBottom: 20
    },
    cardThumbnail: {
        height: 120,
        width: 80
    },
    cardInfo: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10  
    },
    title: {
        color: colors.title
    },
    mangaTitle: {
        fontSize: 20
    },
    subtitle: {
        color: colors.subtitle,
        fontSize: 12.5
    },
    cardInfoBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mangaStatusContainer: {
        justifyContent: 'flex-end'
    },
    buttonGroupContainer: {
        height: 30,
        backgroundColor: colors.background,
        borderColor: colors.button
    },
    bottomContainer: {
        paddingTop: 20
    }
})

export default MangaInfo