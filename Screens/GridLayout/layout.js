import React, { Component } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './layoutStyles';
import { Searchbar } from 'react-native-paper';
import Axios from 'axios';
import Modal from 'react-native-modal';
import { Container, Item } from 'native-base';

const numColumns = 3;

export default class Layout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            flickerData: [],
            imageModalLoad: false,
            searchText: '',
            uri: '',
            apiURL: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&per_page=15&format=json&nojsoncallback=1&tags='
        }

    }


    componentDidMount() {
        this.callFlickerApi();
    }

    callFlickerApi = async () => {
        const request = await Axios.get(this.state.apiURL + 'Google');

        this.setState({
            flickerData: request.data.photos.photo,
        })

    }

    renderModal = ({ item }) => {
        this.setState({
            imageModalLoad: true,
            uri: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`,
        })

    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.renderModal({ item })}>
                <View style={styles.item} >
                    <Image
                        style={styles.itemImage}
                        source={{
                            uri: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`,
                        }}
                    />
                </View>
            </TouchableOpacity>

        );
    };

    searchItems = async (val) => {
        const request = await Axios.get(this.state.apiURL + val);

        this.setState({
            flickerData: request.data.photos.photo,
        })
    }

    onRectPress = async (val) => {
        const request = await Axios.get(this.state.apiURL + val);

        this.setState({
            flickerData: request.data.photos.photo,
        })
    }

    render() {
        return (

            <Container>
                <Item style={styles.search}>
                    <Searchbar
                        style={styles.searchBar}
                        placeholder="Search Images"
                        onSubmitEditing={(event) => this.searchItems(event.nativeEvent.text)}
                    />
                </Item>

                <View style={styles.tagsContainer}>
                    <TouchableOpacity onPress={() => this.onRectPress('Nature')}>
                        <View style={styles.rectangle1}>
                            <Text style={styles.rectText1}>Nature</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.onRectPress('Mobile')}>
                        <View style={styles.rectangle1}>
                            <Text style={styles.rectText1}>Mobile</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.onRectPress('Fashion')}>
                        <View style={styles.rectangle1}>
                            <Text style={styles.rectText1}>Fashion</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <FlatList
                    style={{ marginTop: 100 }}
                    data={this.state.flickerData}
                    style={styles.container}
                    renderItem={this.renderItem}
                    numColumns={numColumns}
                />
                <View>
                    <Modal isVisible={this.state.imageModalLoad} onBackdropPress={() => this.setState({ imageModalLoad: false })} onBackButtonPress={() => this.setState({ imageModalLoad: false })}>
                        <View>
                            <Image style={{ height: 250 }} source={{ uri: this.state.uri }} />
                        </View>
                    </Modal>
                </View>
            </Container>

        );
    }
}