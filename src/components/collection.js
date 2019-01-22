import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

//modules
import Nav from '../modules/menu'
import Footer from '../modules/footer'

export default class Collection extends Component {

    constructor(props) {
        super(props)
        this.state = {
          images: [],
          images_loaded: false,
          collection: '',
          collection_loaded: '',
          show_single_image: false,
          single_image_content: ''
        }    
    }


    componentDidMount() {
        const {id} = this.props.match.params
        //fetch images
        fetch('https://api.unsplash.com/collections/'+id+'/photos?client_id=0299a40cae13c4b153a58d2464bb7acc953cb41617705350f1cd9531e3564a1e&per_page=20')
        .then(async (response) => {return await response.json()})
        .then(images => {
            setInterval(() => {
                this.setState({
                    images: images,
                    images_loaded: true
                })
            },500)
        })
        .catch(err => {console.log(err)})

        //fetch collection information
        fetch('https://api.unsplash.com/collections/'+id+'?client_id=0299a40cae13c4b153a58d2464bb7acc953cb41617705350f1cd9531e3564a1e')
        .then(async (response) => {return await response.json()})
        .then(collection => {
            setInterval(() => {
                this.setState({
                    collection: collection,
                    collection_loaded: true
                })
            },500)
        })
        .catch(err => {console.log(err)})
    }


  render() {
        let show_single_image
        //display image if user clicks on image
        if(this.state.show_single_image){
            show_single_image = 
                <div id="single_image">
                    <div className="single_image_con">
                        <div className="exit_image" onClick={() => this.setState({show_single_image: false, single_image_content: false})}>X</div>
                        <img src={this.state.single_image_content.urls.regular} alt={'single'} />
                        <span>{this.state.single_image_content.description}</span>
                    </div>
                </div>
        }else{
            show_single_image = ''
        }

    return (
        <div>
            <Nav />
            <section id="collection">
                {show_single_image}
                <div className="con">        
                    <h1><NavLink to="/">Collection</NavLink> > {this.state.collection.title}</h1>                     
                    {this.state.images_loaded  ? 
                        <div className="wrapper">
                            {this.state.images.map((image,i) => {
                                return(
                                    <div onClick={() => this.setState({show_single_image: true, single_image_content:image})} key={i} className="image">
                                        <img  src={image.urls.regular} alt={image.description} />
                                        <span>{image.description}</span>
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


