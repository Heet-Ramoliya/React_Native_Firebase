import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {ref, onValue, push, set} from 'firebase/database';
import {db1} from '../Firebase/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [storedUserId, setStoredUserId] = useState('');

  useEffect(() => {
    getUserIdFromStorage();
  }, []);

  const getUserIdFromStorage = async () => {
    try {
      const id = await AsyncStorage.getItem('UserId');
      if (id !== null) {
        setStoredUserId(id);
      }
    } catch (error) {
      console.error('Error retrieving userId from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    const chatsRef = ref(db1, 'chats');
    onValue(chatsRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.keys(data).map(key => ({
          _id: key,
          createdAt: data[key].createdAt,
          text: data[key].text,
          user: data[key].user,
        }));
        setMessages(messagesArray.reverse());
      } else {
        setMessages([]);
      }
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    messages.forEach(message => {
      const timestamp = moment().valueOf();
      const newMessageRef = push(ref(db1, 'chats'));
      set(newMessageRef, {
        createdAt: timestamp,
        text: message.text,
        user: message.user,
      });
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: storedUserId,
        name: 'User',
        avatar: 'https://i.pravatar.cc/100',
      }}
      renderAvatar={props => {
        return (
          <View style={{marginRight: 5}}>
            <Image
              source={{uri: props.currentMessage.user.avatar}}
              style={{width: 30, height: 30, borderRadius: 15}}
            />
          </View>
        );
      }}
      renderTime={props => {
        return (
          <View style={{marginRight: 10, padding: 5}}>
            <Text style={{fontSize: 10, color: 'black'}}>
              {moment(props.currentMessage.createdAt).format('LT')}
            </Text>
          </View>
        );
      }}
    />
  );
};

export default Chat;
