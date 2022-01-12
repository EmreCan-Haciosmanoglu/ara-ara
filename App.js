import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Conversation } from './Pages/Conversation';
import { MainPage } from './Pages/MainPage';
import { AddContact } from './Pages/AddContact';
import { LoginPage } from './Pages/LoginPage';

export default function App() {
  const [page, setPage] = useState('LoginPage');
  const [my_num, setMyNum] = useState(905554443321);
  const [num, setNum] = useState(0);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  if (page == 'LoginPage') {
    return (
      <LoginPage
        cacheLoginInfo={(n, p, t) => {
          setMyNum(n)
          setPassword(p)
          setToken(t)
        }}
        onLoggedIn={() => {
          setPage("Main");
        }}
      />
    );
  }
  else if (page == 'Main') {
    return (
      <MainPage
        token={token}
        password={password}
        number={my_num}
        cacheLoginInfo={(n, p, t) => {
          setMyNum(n)
          setPassword(p)
          setToken(t)
        }}
        onPress={(page_name, contact_number) => {
          setPage(page_name);
          setNum(contact_number);
        }}
        onAddContact={() => setPage("AddContactPage")}
        logout={() => setPage("LoginPage")}
      />
    );
  }
  else if (page == "ConversationPage") {
    return (
      <Conversation
        my_number={my_num}
        password={password}
        token={token}
        contact_number={num}
        onTitlePress={() => {
          setPage("Main");
        }}
        onSendMessage={(text_to_send) => {
          fetch('https://ara--ara.herokuapp.com/conv/', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "sender": my_num,
              "reciever": num,
              "message": text_to_send,
              "password": password,
              "token": token
            })
          }).then((response) => response.json())
            .then((json) => {
              if (!json.success) console.error(json);
            })
            .catch((error) => {
              console.error(error);
            });
        }}
      />
    );
  }
  else {
    return (
      <AddContact
        my_number={my_num}
        onContactAdd={(number, name) => {
          setPage("Main");
          fetch('https://ara--ara.herokuapp.com/contact/', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "owner": my_num,
              "number": number,
              "name": name,
              "password": password,
              "token": token
            })
          }).then((response) => response.json())
            .then((json) => {
              if (!json.success) console.error(json.error);
            })
            .catch((error) => {
              console.error(error);
            });
        }}
        onCancel={() => {
          setPage("Main");
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
