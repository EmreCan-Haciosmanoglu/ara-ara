import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

export class MessageList extends Component {
    generateList() {
        return this.props.list.map((val, index) => {
            let style = val.sender != this.props.sender ? styles.user : styles.friend
            return (
                <Text style={style} key={index}>{val.message}</Text>
            );
        })
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
    friend: {
        backgroundColor: '#eee',
        padding: '2%',
        paddingLeft: '5%',
        textAlign: 'left',
    },
    user: {
        backgroundColor: '#bbb',
        padding: '2%',
        paddingRight: '5%',
        textAlign: 'right',
    }
});