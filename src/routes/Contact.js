import React from 'react';
import Pinheader from '../components/Pinheader';

class Contact extends React.Component {
  render () {
    return (
      <div>
        <Pinheader />
        <a href="https://www.linkedin.com/in/goheungchoi/"
          style={{color: "black"}}
        >My LinkIn Address</a>
      </div>
    )
  }
}

export default Contact;