import React from 'react';
import './App.css';
import Social from './component/Social'

import axios from 'axios';

class App extends React.Component {
  state = {
    'username': '',
  }

  socialList = [
    'blex.me',
    'brunch.co.kr',
    'buymeacoffee.com',
    'facebook.com',
    'github.com',
    'instagram.com',
    'medium.com',
    'tistory.com',
    'twitter.com',
    'velog.io',
    'youtube.com',
  ]

  componentDidMount = () => {
    this.socialList.forEach((social) => {
      this.setStateSocial(social, 'D');
    });
  }

  onChange = (e) => {
    let newState = this.state;
    newState.username = e.target.value;
    this.setState(newState);
  }

  setStateSocial = (social, state) => {
    let newState = this.state;
    newState[social] = state;
    this.setState(newState);
  }

  onClick = () => {
    if(this.state.username === '') {
      alert('이름을 입력해주세요!');
      return;
    }
    const self = this;
    const requests = function(social, username) {
      self.setStateSocial(social, 'L');
      axios.get("https://api.baejino.com/snsnc", {
        params: {
          social: social,
          username: username
        }
      }).then(response => {
        if(JSON.stringify(response.data).includes('Y')) {
          self.setStateSocial(social, 'S');
        } else {
          self.setStateSocial(social, 'F');
        }
      });
    }

    this.socialList.forEach(social => {
      requests(social, this.state.username);
    });
  }
  
  render() {
    let socialComponets = this.socialList.map((social, idx) => {
      return <Social key={idx} name={social} state={this.state[social]}/>
    })
    return (
      <div className="App">
        <input placeholder="username" onChange={this.onChange} className="basic input"/>
        <button onClick={this.onClick} className="basic button">Search</button>
        {socialComponets}
        <p className="footer">Copyright &copy; 2020 <a href="https://im.baejino.com">BaeJino</a>.</p>
      </div>
    );
  }
}

export default App;
