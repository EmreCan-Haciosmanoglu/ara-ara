import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { StyleSheet, Text, Button, TouchableOpacity, View } from 'react-native';
import { CheckBox, TextInput } from 'react-native-web';

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

    getRegistered() {
        return fetch('http://192.168.1.100:3000/register/', {
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
                this.props.setMyNumber(number)
            }
            else {
                console.log("no data have been stored")
            }
        } catch (error) {
            console.log("error= " + error)
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
                    <CheckBox
                        value={this.state.remember}
                        onValueChange={() => this.setState({ remember: !this.state.remember })}
                    />
                    <Text style={{
                        marginLeft: "5px"
                    }}>Remember me!!</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.login}
                    >
                        <Text
                            style={styles.button_text}>
                            log in
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.register}
                    >
                        <Text
                            style={styles.button_text}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        height: "150px",
        width: "70%",
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 50,
        fontFamily: "sans-serif-medium",
        margin: "5px"
    },
    text_input: {
        height: "50px",
        width: "70%",
        backgroundColor: '#aac',
        textAlign: 'center',
        margin: "5px"
    },
    remember: {
        height: "30px",
        width: "70%",
        textAlign: 'center',
        margin: "5px",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        height: "30px",
        width: "70%",
        textAlign: 'center',
        margin: "5px",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: "center",
        margin: "5px",
        borderRadius: "3px",
        backgroundColor: "rgb(33, 150, 243)",
        padding: 10
    },
    button_text: {
        textTransform: 'uppercase',
        color: "#fff",
        fontWeight: "bold"
    },
});