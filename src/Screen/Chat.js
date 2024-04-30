import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {ref, onValue, push, set} from 'firebase/database';
import {db1} from '../Firebase/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

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
          msgType: data[key].msgType,
          text: data[key].text,
          image: data[key].image,
          user: data[key].user,
        }));
        setMessages(messagesArray.reverse());
      } else {
        setMessages([]);
      }
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    messages.forEach(async message => {
      console.log('message ==> ', message);
      const timestamp = moment().valueOf();
      const newMessageRef = push(ref(db1, 'chats'));
      const newMessage = {
        createdAt: timestamp,
        user: message.user,
      };
      if (message.text) {
        newMessage.msgType = 'text';
        newMessage.text = message.text;
      }
      if (message.image) {
        newMessage.msgType = 'image';
        newMessage.image = message.image;
      }
      await set(newMessageRef, newMessage);
    });
  }, []);

  const uploadImage = async () => {
    ImagePicker.openPicker({
      cropping: false,
    }).then(async image => {
      let imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
      let ext = imgName.split('.').pop();
      let names = imgName.split('.')[0];
      let newName = names + Date.now() + '.' + ext;
      const reference = storage().ref('chatMedia/' + newName);
      await reference.putFile(image.path);

      const url = await storage()
        .ref('chatMedia/' + newName)
        .getDownloadURL();

      const newMessage = {
        _id: Math.random().toString(36).substring(7),
        createdAt: new Date(),
        image: url,
        user: {
          _id: storedUserId,
          name: 'User',
          avatar: 'https://i.pravatar.cc/100',
        },
      };

      onSend([newMessage]);
    });
  };

  return (
    <View style={{flex: 1}}>
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
      <View style={{position: 'absolute', bottom: 0, right: 7}}>
        <TouchableOpacity
          onPress={() => {
            uploadImage();
          }}>
          <Icon name="attach-file" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;
