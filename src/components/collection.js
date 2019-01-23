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
          single_image_content: '',
          loading_more: false,
          current_page: 1
        }    

        this.check_window_height = this.check_window_height.bind(this);
        this.ininty_scroll = this.ininty_scroll.bind(this);
    }


    componentDidMount() {
        //add listener to window height for inity scroll
        window.addEventListener("scroll", this.check_window_height);
        //get the id from url
        const {id} = this.props.match.params
        //fetch images
        fetch('https://api.unsplash.com/collections/'+id+'/photos?client_id=0299a40cae13c4b153a58d2464bb7acc953cb41617705350f1cd9531e3564a1e&per_page=20&page=' +  this.state.current_page)
        .then(async (response) => {return await response.json()})
        .then(images => {
            setTimeout(() => {
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
            setTimeout(() => {
                this.setState({
                    collection: collection,
                    collection_loaded: true
                })
            },500)
        })
        .catch(err => {console.log(err)})
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.check_window_height);
    }

    check_window_height = () => {
        let container = this.container.clientHeight - 500
        if(window){
            if(window.scrollY >= container ){
                this.ininty_scroll()
            }
        }
    }

    ininty_scroll = () => {
        const {id} = this.props.match.params
        this.setState({
            loading_more: true,
            current_page: this.state.current_page + 1
        })
        //fetch collection information
        fetch('https://api.unsplash.com/collections/'+id+'/photos?client_id=0299a40cae13c4b153a58d2464bb7acc953cb41617705350f1cd9531e3564a1e&per_page=12&page=' +  this.state.current_page)
        .then(async (response) => {return await response.json()})
        .then(images => {
            setTimeout(() => {
                this.setState({
                    images: this.state.images.concat(images), 
                    loading_more: false,
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
                        <div className="wrapper" ref={ (container) => this.container = container}>
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
                    {this.state.loading_more ? <div className="spinner"><div></div></div> : ''}
                </div>           
            </section>
            
            <Footer />
        </div>
    );
  }
}


