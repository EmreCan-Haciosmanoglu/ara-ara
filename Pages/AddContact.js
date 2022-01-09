import React, { Component } from 'react';
import { Button } from 'react-native';
import { StyleSheet, View, TextInput } from 'react-native';

export class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: ""
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        width: '100%',
                        height: '40%',
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                    <TextInput
                        style={{
                            width: '50%',
                            height: 36,
                            backgroundColor: '#aaa',
                            fontSize: 12,
                            paddingLeft:10
                        }}
                        placeholder="Type a phone number to add"
                        onChangeText={text => this.setState({ number: text })}
                        defaultValue={this.state.number}
                    ></TextInput>
                    <View>
                        <Button
                            title="Add"
                            onPress={() => { this.props.onContactAdd(this.state.number) }}
                        ></Button>
                    </View>
                    <View>
                        <Button title="Cancel"
                            onPress={this.props.onCancel}>
                        </Button>
                    </View>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
});