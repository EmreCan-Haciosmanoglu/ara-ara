import React, { Component } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { ContactList } from '../Components/ContactList';

export class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact_list: []
        };
        this.getContactList();
    }

    getContactList = async () => {
        let obj = await this.getResponse()
        this.setState({ "contact_list": obj.data })
    }

    getResponse() {
        return fetch('http://192.168.1.42:3000/contacts/?owner=' + this.props.my_number)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    };


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.title}>{"My Number: +" + this.props.my_number}</Text>
                    <Button
                        style={styles.addContract}
                        title="    +    "
                        onPress={this.props.onAddContact}
                    ></Button>
                    <Button
                        style={styles.changeNumber}
                        title="    !    "
                        onPress={this.props.onChangeMyNumber}
                    ></Button>
                </View>
                <ContactList
                    style={{
                        width: '100%',
                        height: '80%'
                    }}
                    my_number={this.state.my_number}
                    contact_list={this.state.contact_list}
                    onPress={this.props.onPress}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        height: "100%",
        width: "70%",
        backgroundColor: '#aac',
        textAlign: 'center',
    },
    top: {
        marginTop: '10%',
        height: "5%",
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-around"
    },
    addContract: {
        height: "100%",
        width: "20%",
        backgroundColor: '#aad',
    },
    changeNumber: {
        height: "100%",
        width: "20%",
        backgroundColor: '#aad',
    },
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
});