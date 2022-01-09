import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

export class ContactList extends Component {
    constructor(props) {
        super(props);
    }

    generateList() {
        let list = this.props.contact_list;
        if (list == undefined) {
            list = ["test"]
        }
        return list.map((val, index) => {
            return (
                <Text
                    style={styles.contact_number}
                    key={index}
                    onPress={()=>{this.props.onPress("ConversationPage", val.number)}}>
                    {val.number}
                </Text>
            );
        });
    }

    render() {
        return (
            <ScrollView style={this.props.style}>
                {this.generateList()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contact_number: {
        backgroundColor: '#eee',
        padding: '2%',
        marginTop: '2%',
        paddingLeft: '5%',
        textAlign: 'left',
    },

});