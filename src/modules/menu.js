import React, { Component } from 'react'



export default class Menu extends Component {

  render() {
    return (
        <header>
           <div className="con">
                <div className="col">
                    <img src="/img/logo.png" alt="Rivercode"/>
                </div>
                <div className="col large">
                    <input type="text" placeholder="Search anything on Unsplash"/>
                </div>
                <div className="col">
                    <a href="https://source.unsplash.com/random" target="_blank" rel="noopener noreferrer"  >Random Image <i className="fas fa-chevron-right"></i></a>
                </div>
           </div>
        </header>
    );
  }
}


