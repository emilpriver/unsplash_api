import React, { Component } from 'react'


//modules
import Nav from '../modules/menu'
import Footer from '../modules/footer'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
          images: [],
          images_loaded: false,
        }    
    }


    componentDidMount() {
        fetch('https://api.unsplash.com/collections/featured?client_id=0299a40cae13c4b153a58d2464bb7acc953cb41617705350f1cd9531e3564a1e&per_page=36')
        .then(async (response) => {return await response.json()})
        .then(images => {
            setInterval(() => {
                this.setState({
                    images: images,
                    images_loaded: true
                })
            },500)
        })
        .catch(err => {

        })
    }



  render() {
    return (
        <div>
            <Nav />
            <section id="home">
                <div className="con">
                    <h1>Unsplash Collections</h1>
                    {this.state.images_loaded  ? 
                        <div className="wrapper">
                            {this.state.images.map((image,i) => {
                                return(
                                    <div key={i} className="collection" style={{backgroundImage: `url(${image.cover_photo.urls.regular})`}}>
                                        <a href={'/collection/' + image.id}> &nbsp;</a>
                                        <h3>{image.title}</h3>
                                    </div>
                                    )                                   
                                })}
                        </div>             
                    :   <div className="spinner"><div></div></div>}
                </div>            
            </section>

            <Footer />
        </div>
    );
  }
}


