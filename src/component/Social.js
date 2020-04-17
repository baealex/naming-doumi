import React from 'react';

class Social extends React.Component {
  render() {
    let icon = '';
    if(this.props.state === 'D') {
      icon = <i className="fas fa-circle-notch"></i>
    } else if(this.props.state === 'L') {
      icon = <i className="fas fa-circle-notch fa-spin"></i>
    } else if(this.props.state === 'S') {
      icon = <i className="fas fa-check"></i>
    } else if(this.props.state === 'F') {
      icon = <i className="fas fa-times"></i>
    }
    return (
      <div className="card">
        <span className="social-name"><a href={`https://${this.props.name}`}>{this.props.name}</a></span>
        <span className="social-icon">{icon}</span>
      </div>
    );
  }
}

export default Social;
