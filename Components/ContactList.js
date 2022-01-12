import React, { Component } from 'react';
import { View, Button, StyleSheet, ScrollView, Text } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

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
                <View
                    key={index}
                    style={styles.contact_container}
                >
                    <Text
                        style={styles.main_name}
                    >
                        {val.name != "" ? val.name : val.number}
                    </Text>
                    <Text
                        style={styles.sub_name}
                        onPress={() => { this.props.onPress("ConversationPage", val.number) }}
                    >
                        {val.name != "" ? "~" + val.number + "~" : ""}
                    </Text>
                    <View style={{ flex: 1 }}>
                        <Button
                            onPress={() => { this.props.onPress("ConversationPage", val.number) }}
                            title="Text"
                        />
                    </View>
                </View>
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
    contact_container: {
        backgroundColor: '#eee',
        width: '98%',
        marginTop: 7,
        marginLeft: "1%",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 30,
        paddingRight: 15
    },
    main_name: {
        backgroundColor: '#eee',
        padding: '2%',
        marginTop: '2%',
        paddingLeft: '5%',
        textAlign: 'left',
        flex: 1
    },
    sub_name: {
        backgroundColor: '#eee',
        padding: '2%',
        marginTop: '2%',
        paddingLeft: '5%',
        textAlign: 'left',
        flex: 3
    },

});