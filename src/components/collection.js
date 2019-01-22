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


    componentDidMount() {
        fetch('https://api.unsplash.com/collections/featured?client_id=dd0d9301ea5cc3aa7b5a72de8e7791dc6c611871d92452efe1a18dbf77ddc9fc&per_page=21')
        .then(async (response) => {return await response.json()})
        .then(images => {
            setInterval(() => {
                this.setState({
                    images: images,
                    images_loaded: true
                })
            },0)
        })
        .catch(err => {

        })
    }



  render() {
    return (
        <div>
            <Nav />
            <section id="collection">
            
            </section>
        </div>
    );
  }
}


