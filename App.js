import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Conversation } from './Pages/Conversation';
import { MainPage } from './Pages/MainPage';
import { AddContact } from './Pages/AddContact';
import { ChangeMyNumber } from './Pages/ChangeMyNumber'

export default function App() {
  const [page, setPage] = useState('Main');
  const [my_num, setMyNum] = useState(905554443321);
  const [num, setNum] = useState(0);
  if (page == 'ChangeMyNumber') {
    return (
      <ChangeMyNumber
        my_number={my_num}
        onTextChange={(number) => { setMyNum(number) }}
        onPress={() => {
          setPage("Main");
        }}
      />
    );
  }
  else if (page == 'Main') {
    return (
      <MainPage
        my_number={my_num}
        onPress={(page_name, contact_number) => {
          setPage(page_name);
          setNum(contact_number);
        }}
        onAddContact={() => {
          setPage("AddContactPage")
        }}
        onChangeMyNumber={() => {
          setPage("ChangeMyNumber")
        }}
      />
    );
  }
  else if (page == "ConversationPage") {
    return (
      <Conversation
        my_number={my_num}
        contact_number={num}
        onTitlePress={() => {
          setPage("Main");
        }}
        onSendMessage={(text_to_send)=>{
          fetch('http://192.168.1.42:3000/conv/', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "sender": my_num,
              "reciever": num,
              "message":text_to_send
            })
          }).then((response) => response.json())
          .then((json) => {
             console.warn(json);
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
        onContactAdd={(number) => {
          setPage("Main");
          fetch('http://192.168.1.42:3000/contact/', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "owner": my_num,
              "number": number
            })
          }).then((response) => response.json())
          .then((json) => {
             console.warn(json);
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
