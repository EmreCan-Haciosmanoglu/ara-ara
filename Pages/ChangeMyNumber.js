import React, { Component } from 'react';
import { Button } from 'react-native';
import { StyleSheet, View, TextInput } from 'react-native';

export class ChangeMyNumber extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    style={{
                        width: '60%',
                        height: 36,
                        backgroundColor: '#aaa',
                        paddingLeft:15,
                    }}
                    placeholder="Type a phone number to add"
                    onChangeText={(text) => { this.props.onTextChange(text) }}
                    value={"" + this.props.my_number}
                ></TextInput>
                <View>
                    <Button
                        title="Go back"
                        onPress={() => { this.props.onPress() }}
                    ></Button>
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
        flexDirection: 'row'
    },
});