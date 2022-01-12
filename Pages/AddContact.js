import React, { Component } from 'react';
import { Button, Text, StyleSheet, View, TextInput } from 'react-native';

export class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: "",
            name: ""
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.title}>
                    Add A Contact
                </Text>
                <TextInput
                    style={styles.text_input}
                    placeholder="Type a phone number to add"
                    onChangeText={text => this.setState({ number: text })}
                    defaultValue={this.state.number}
                />
                <TextInput
                    style={styles.text_input}
                    placeholder="Type a name for the phone number"
                    onChangeText={text => this.setState({ name: text })}
                    defaultValue={this.state.name}
                />
                <View style={styles.buttons}>
                    <Button
                        title="Add"
                        onPress={() => {
                            this.props.onContactAdd(this.state.number, this.state.name)
                        }}
                    ></Button>
                    <Button title="Cancel"
                        onPress={this.props.onCancel}>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        height: 100,
        width: "70%",
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 40,
        fontFamily: "sans-serif-medium",
        margin: 5
    },
    text_input: {
        height: 50,
        width: "70%",
        backgroundColor: '#aac',
        textAlign: 'center',
        margin: 5
    },
    remember: {
        height: 30,
        width: "70%",
        textAlign: 'center',
        margin: 5,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        height: 40,
        width: "42%",
        textAlign: 'center',
        margin: 5,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: "center",
        margin: 5,
        borderRadius: 3,
        backgroundColor: "rgb(33, 150, 243)",
        padding: 10
    },
    button_text: {
        textTransform: 'uppercase',
        color: "#fff",
        fontWeight: "bold"
    },
});