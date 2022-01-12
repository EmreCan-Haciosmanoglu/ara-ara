import React, { Component } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { MessageList } from '../Components/MessageList';


export class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text_to_send: "",
            conversation_list: []
        };
        this.getConversation();
    }

    getConversation = async () => {
        let obj1 = await this.getResponse(
            this.props.my_number,
            this.props.contact_number,
            this.props.my_number,
            this.props.password,
            this.props.token);
        let obj2 = await this.getResponse(
            this.props.contact_number,
            this.props.my_number,
            this.props.my_number,
            this.props.password,
            this.props.token);
        var list = obj1.data.concat(obj2.data);
        list.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });
        this.setState({ conversation_list: list })
    }

    getResponse(sender, reciever, mynumber, password, token) {
        return fetch('https://ara--ara.herokuapp.com/conv/?' +
            'sender=' + sender +
            '&reciever=' + reciever +
            '&mynumber=' + mynumber +
            '&password=' + password +
            '&token=' + token
        )
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
                <Text
                    style={styles.title}
                    onPress={this.props.onTitlePress}>
                    {"Friend's Number: +" + this.props.contact_number}
                </Text>
                <MessageList
                    style={{
                        width: '100%',
                        height: '70%'
                    }}
                    reciever={this.props.my_number}
                    sender={this.props.contact_number}
                    list={this.state.conversation_list}

                />
                <View
                    style={{
                        height: '5%',
                        flexDirection: 'row'
                    }}
                >
                    <TextInput
                        style={{ width: '60%' }}
                        placeholder="Type your message!"
                        onChangeText={text => this.setState({ text_to_send: text })}
                        defaultValue={this.state.text_to_send}
                    />
                    <Button
                        title="Press Me"
                        onPress={() => {
                            this.props.onSendMessage(
                                this.state.text_to_send
                            );
                            this.setState({ text_to_send: "" })
                            this.getConversation()
                        }}>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        marginTop: '10%',
        height: "5%",
        width: "100%",
        backgroundColor: '#aac',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
});