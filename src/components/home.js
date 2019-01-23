import React, { Component } from 'react'
import { Link } from 'react-router-dom'

//modules
import Nav from '../modules/menu'
import Footer from '../modules/footer'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
          images: [],
          images_loaded: false,
          current_page: 1,
          loading_more: false,
        }    
        this.check_window_height = this.check_window_height.bind(this);
        this.ininty_scroll = this.ininty_scroll.bind(this);
    }


    componentDidMount() {    //add listener to window height for inity scroll
        window.addEventListener("scroll", this.check_window_height);
        //fetch data
        fetch('https://api.unsplash.com/collections?client_id='+process.env.REACT_APP_TOKEN+'&per_page=12&page=' + this.state.current_page)
        .then(async (response) => {return await response.json()})
        .then(images => {
            setTimeout(() => {
                this.setState({
                    images: images,
                    images_loaded: true
                })
            },500)
        })
        .catch(err => {})
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.check_window_height);
    }
    
    check_window_height = () => {
        if(this.container){
            let container = this.container.clientHeight - 520
            if(window){
                if(window.scrollY >= container ){
                    this.ininty_scroll()
                }
            }
        }
    }
    ininty_scroll = () => {

        this.setState({
            loading_more: true,
            current_page: this.state.current_page + 1
        })
        //fetch collection information
        fetch('https://api.unsplash.com/collections/featured?client_id='+process.env.REACT_APP_TOKEN+'&per_page=12&page=' +  this.state.current_page)
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
    return (
        <div>
            <Nav />
            <section id="home">
                <div className="con">
                    <h1>Unsplash Collections</h1>
                    {this.state.images_loaded  ? 
                        <div className="wrapper" ref={ (container) => this.container = container}>
                            {this.state.images.map((image,i) => {
                                return(
                                    <div key={i} className="collection" style={{backgroundImage: `url(${image.cover_photo.urls.regular})`}}>
                                        <Link to={'/collection/' + image.id}> &nbsp;</Link>
                                        <h3>{image.title}</h3>
                                    </div>
                                    )                                   
                                })}
                        </div>             
                    :   <div className="spinner"><div></div></div>}
                    {this.state.loading_more ? <div className="spinner"><div></div></div>: ''}
                </div>            
            </section>

            <Footer />
        </div>
    );
  }
}


