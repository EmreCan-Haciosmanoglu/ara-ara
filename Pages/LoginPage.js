import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

export class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: "",
            password: "",
            remember: false
        };
        this.retrieveLoginInformations();
    }

    getVerified(token, number, password) {
        return fetch('https://ara--ara.herokuapp.com/verify/?' +
            'token=' + token +
            '&mynumber=' + number +
            '&mypassword=' + password)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    };

    login = async () => {
        let response = await this.getLoggedIn()
        if (!response.success) return console.error(response.error)
        if (this.state.remember) {
            AsyncStorageLib.setItem('number', this.state.number)
            AsyncStorageLib.setItem('password', this.state.password)
            AsyncStorageLib.setItem('token', response.token)
        }
        this.props.cacheLoginInfo(
            this.state.number,
            this.state.password,
            response.token
        )
        this.props.onLoggedIn()
    }

    register = async () => {
        let response = await this.getRegistered()
        if (!response.success) return console.error(response.error)
        if (this.state.remember) {
            await AsyncStorageLib.setItem('number', this.state.number)
            await AsyncStorageLib.setItem('password', this.state.password)
            await AsyncStorageLib.setItem('token', response.token)
        }
        this.props.cacheLoginInfo(
            this.state.number,
            this.state.password,
            response.token
        )
        this.props.onLoggedIn()
    }

    getRegistered() {
        return fetch('https://ara--ara.herokuapp.com/register/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "mynumber": this.state.number,
                "mypassword": this.state.password
            })
        }).then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getLoggedIn() {
        return fetch('https://ara--ara.herokuapp.com/login/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "mynumber": this.state.number,
                "mypassword": this.state.password
            })
        }).then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    retrieveLoginInformations = async () => {
        try {
            const number = await AsyncStorageLib.getItem('number');
            const token = await AsyncStorageLib.getItem('token');
            const password = await AsyncStorageLib.getItem('password');
            if (number !== null && password !== null && token !== null) {
                let response = await this.getVerified(token, number, password)
                console.log(response)
                if (!response.success) return console.error(response.error)
                this.props.cacheLoginInfo(
                    number,
                    password,
                    token
                )
                this.props.onLoggedIn()
            }
            else {
                console.log("no data have been stored")
            }
        } catch (error) {
            console.error(error)
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={styles.title}>
                    ARA  ARA
                </Text>
                <TextInput
                    style={styles.text_input}
                    onChangeText={text => this.setState({ number: text })}
                    defaultValue={this.state.number}
                    placeholder="Enter Your Phone Number"
                />
                <TextInput
                    style={styles.text_input}
                    onChangeText={text => this.setState({ password: text })}
                    defaultValue={this.state.password}
                    placeholder="Enter Your Password"
                    secureTextEntry={true}
                />
                <View
                    style={styles.remember}
                >
                    <BouncyCheckbox
                        isChecked={this.state.remember}
                        onPress={() => this.setState({ remember: !this.state.remember })}
                    />
                    <Text style={{
                        marginLeft: 5
                    }}>Remember me!!</Text>
                </View>
                <View style={styles.buttons}>
                    <Button
                        onPress={this.login}
                        title="log in"
                    />
                    <Button
                        onPress={this.register}
                        title="Register"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        height: 150,
        width: "70%",
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 50,
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