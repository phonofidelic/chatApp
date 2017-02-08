import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const MESSAGES = 'http://localhost:8081/messages';

function Message(props) {
  return <li>{props.text}</li>;
}

Message.propTypes = {
  text: React.PropTypes.string.isRequired
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      currentMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get(MESSAGES).then(res => {           
      console.log('Initial messages:', res)

      const messages = res.data;
      this.setState({messages})
    })
  }

  handleChange(e) {
    this.setState({currentMessage: e.target.value});
  }

  onPostMsg(e, msg) {
    e.preventDefault();
    console.log('Post message:', msg)
    axios.post(MESSAGES, {text: msg}).then(res => {
      console.log('onPostMsg response:', res);
      this.state.messages.push(res.data);
      // var newMsg = res.data;
      this.setState({});
    })
  }
  render() {
    return (
      <div>
      <header>
        <h1>phono_chat</h1>
      </header>
        <ul id="messages">
          {this.state.messages.map(msg => {
            return (
              <Message 
                text={msg.text}
                key={msg._id} />
            );
          })}
        </ul>
        <form>
          <input type="text" value={this.state.currentMessage} onChange={this.handleChange}/>
          <button onClick={(e) => this.onPostMsg(e, this.state.currentMessage)}>post</button>
        </form>
      </div>
    );
  }
}

export default App;
