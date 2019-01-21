import React, { Component } from 'react'


//modules
import Nav from '../modules/menu'


export default class Home extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          images: [],
          images_loaded: false,
        }    
      }

  render() {
    return (
        <div>
            <Nav />
        </div>
    );
  }
}


