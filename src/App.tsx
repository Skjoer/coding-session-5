import React from 'react';
import logo from './logo.svg';
import { Header } from 'semantic-ui-react'
import './App.css';
import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCm60kMZo4ayzEOUTEIM_XjOmeilrWI_Rw",
  authDomain: "simplechatapp-481e5.firebaseapp.com",
  databaseURL: "https://simplechatapp-481e5.firebaseio.com",
  projectId: "simplechatapp-481e5",
  storageBucket: "simplechatapp-481e5.appspot.com",
  messagingSenderId: "625311044714",
  appId: "1:625311044714:web:8b6b429eefdb5adbc06613"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();

interface ChatMessage {
  author: string;
  message: string;
  timestamp: number;
}

interface AppProps {
  headerText: string;
}

interface AppState{
  loadedChatMessages: Array<ChatMessage>
}

class App extends React.Component<AppProps,AppState> {
  state = {
    loadedChatMessages: [{
      author: 'the white bunny',
      message: 'write text here',
      timestamp: Date.now(),
    }]
  } as AppState

  componentDidMount() {
    db.collection("ChatMessages").onSnapshot((query) => {
      const chatPostsDbDocs = query.docs;
      const chatPosts: Array<ChatMessage> = [];
      for (let i = 0; i < chatPostsDbDocs.length; i++) {
        const chatPost = chatPostsDbDocs[i].data() as ChatMessage;
        chatPosts.push(chatPost);  
      }

      this.setState({
        loadedChatMessages: chatPosts
      });
    });
  }

  render(){  
    const chatMessageDivs = [];
    for (let i = 0; i < this.state.loadedChatMessages.length; i++) {
      const ChatMessage = this.state.loadedChatMessages[i];
    chatMessageDivs.push(<div>{ChatMessage.message}</div>)
    }

  return (
    <div className="App">
      <Header color='teal'>{this.props.headerText}</Header>
      {chatMessageDivs}
    </div>
  );
  }
}

export default App;
