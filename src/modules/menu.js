import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Menu extends Component {

    constructor(props){
        super(props)
        this.state = {
            results: '',
            results_loading: false,
            results_found: false
        }
    }

    search_images = (event) => {
        this.setState({results_loading: true})
        fetch('https://api.unsplash.com/search/collections?client_id='+process.env.REACT_APP_TOKEN+'&per_page=10&query=' + event.target.value)
        .then(async (response) => {return await response.json()})
        .then(images => {
            this.setState({
                results: images.results,
                results_found: true
            })
        })
        .catch(err => {})
    }


  render() {
    return (
        <header>
           <div className="con">
                <div className="col">
                   <Link to="/"><img src="/img/logo.png" alt="Emil Privér Logo"/></Link>
                </div>
                <div className="col large">
                    <input type="text" className={this.state.results_loading ? 'loading': ''} onChange={(e) => this.search_images(e)} placeholder="Search anything on Unsplash"/>
                    <div className={(this.state.results_loading ? 'open': '') + ' results'}>
                        {this.state.results_found ? 
                            this.state.results.map((element,i) => {
                                return(<span key={i}><Link to={'/collection/' + element.id}>{element.title}</Link>  </span>)
                            })        
                        : <div className="spinner"><div></div></div>}
                    </div>
                </div>
                <div className="col">
                    <a className="random_image" href="https://source.unsplash.com/random" target="_blank" rel="noopener noreferrer"  >Random Image <i className="fas fa-chevron-right"></i></a>
                </div>
           </div>
        </header>
    );
  }
}


