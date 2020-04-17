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
    'facebook.com',
    'github.com',
    'instagram.com',
    'medium.com',
    'tistory.com',
    'twitter.com',
    'velog.io',
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
    const requests = function(social, url, checker) {
      self.setStateSocial(social, 'L');
      axios.get("https://api.baejino.com/bnc?url=" + url)
      .then(response => {
        console.log(response);
        if(JSON.stringify(response.data).includes(checker) || response.status === 404) {
          self.setStateSocial(social, 'S');
        } else {
          self.setStateSocial(social, 'F');
        }
      });
    }

    requests('blex.me', 'https://blex.me/@' + this.state.username, 'id=\'error-text\'');
    requests('brunch.co.kr', 'https://brunch.co.kr/@' + this.state.username, '존재하지 않는 사용자입니다');
    requests('facebook.com', 'https://facebook.com/' + this.state.username, '페이지가 존재하지 않습니다');
    requests('github.com', 'https://github.com/' + this.state.username, 'Not Found');
    requests('instagram.com', 'https://instagram.com/' + this.state.username, '페이지를 사용할 수 없습니다');
    requests('medium.com', 'https://medium.com/@' + this.state.username, 'We couldn’t find this page');
    requests('tistory.com', 'https://' + this.state.username + '.tistory.com', 'tit_error  tit_error_type2');
    requests('twitter.com', 'https://api.twitter.com/i/users/username_available.json?username=' + this.state.username, '사용 가능합니다');
    requests('velog.io', 'https://velog.io/@' + this.state.username, 'undraw_page_not_found');
  }
  
  render() {
    let socialComponets = this.socialList.map((social, idx) => {
      return <Social key={idx} name={social} state={this.state[social]}/>
    })
    return (
      <div className="App">
        <input placeholder="username" onChange={this.onChange} className="basic input"/>
        <button onClick={this.onClick} className="basic button">탐색</button>
        {socialComponets}
        <p className="footer">Copyright &copy; 2020 <a href="https://im.baejino.com">BaeJino</a>.</p>
      </div>
    );
  }
}

export default App;
