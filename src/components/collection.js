import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
//modules
import Nav from '../modules/menu'
import Footer from '../modules/footer'

//cookies
//import Cookies from 'universal-cookie';
//const cookies = new Cookies();



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
          current_page: 1,
          sending_request: false,
          sending_status: false
        }    

        this.check_window_height = this.check_window_height.bind(this);
        this.ininty_scroll = this.ininty_scroll.bind(this);
    }

    check_window_height = () => {   
        if(this.container){
            let container = this.container.clientHeight - 500
            if(window){
                if(window.scrollY >= container ){
                    this.ininty_scroll()
                }
            }
        }
    }


    componentDidMount() {
        //add listener to window height for inity scroll
        setTimeout(() => window.addEventListener("scroll", this.check_window_height),500)
        //get the id from url
        const {id} = this.props.match.params
        //fetch images
        fetch('https://api.unsplash.com/collections/'+id+'/photos?client_id='+process.env.REACT_APP_TOKEN+'&per_page=20&page=' +  this.state.current_page)
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
        fetch('https://api.unsplash.com/collections/'+id+'?client_id='+process.env.REACT_APP_TOKEN)
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

    ininty_scroll = () => {
        const {id} = this.props.match.params
        this.setState({
            loading_more: true,
            current_page: this.state.current_page + 1
        })
        //fetch collection information
        fetch('https://api.unsplash.com/collections/'+id+'/photos?client_id='+process.env.REACT_APP_TOKEN+'&per_page=12&page=' +  this.state.current_page)
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

    save_collection =  () => {
        const {id} = this.props.match.params
        //let token = cookies.get('_unsplash_user')
        let token = 'emilpriver'
        
        //if(token){
            this.setState({
                sending_request: true,
            })
            fetch('http://localhost:5000/api/collections/' , {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    collection_id: id,
                    user: token 
                })
            })
            .then(response => response.json())
            .then(response => {
                if(response.status){
                    this.setState({
                        sending_status: true,
                        sending_request: false
                    })
                }else{
                    this.setState({
                        sending_status: false,
                        sending_request: false
                    })
                }
            })
            .catch(err => {

            }) 
        //}
    }

    save_image =  () => {
        const {id} = this.props.match.params
        //let token = cookies.get('_unsplash_user')
        let token = 'emilpriver'
        //if(token){
            this.setState({
                sending_image_request: true,
            })
            fetch('http://localhost:5000/api/images/' , {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image_id: id,
                    user: token 
                })
            })
            .then(response => response.json())
            .then(response => {
                if(response.status){
                    this.setState({
                        sending_image_status: true,
                        sending_image_request: false
                    })
                }else{
                    this.setState({
                        sending_image_status: false,
                        sending_image_request: false
                    })
                }
            })
            .catch(err => {console.log(err)}) 
        //}
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
                        <button onClick={this.save_image}>Save Image</button>
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
                    <div className="collection_info">
                        <h1><Link to="/">Collection</Link> > {this.state.collection.title}</h1>  
                        <div className="description"><span><strong>Description</strong>: {this.state.collection.description}</span></div>
                        <a target="_blank" rel="noopener noreferrer" className="to_unsplash" href={this.state.collection.links ? this.state.collection.links.html : ''}>{this.state.collection.title} on Unsplash <i className ="fas fa-chevron-right"></i></a>
                        <span>Released at {moment(this.state.collection.published_at).format('LL') }</span>
                        <button onClick={this.save_collection} >{this.state.sending_request ? 'Saving' : this.state.sending_status ? 'Saved' :'Save Collection'}</button>
                    </div>    
                    <div className="wrapper" ref={(container) => this.container = container}>
                        {this.state.images_loaded  ? 
                            <div className="grid">
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
                    {this.state.loading_more ? <div className="spinner"><div></div></div> : ''}
                </div>           
            </section>
            
            <Footer />
        </div>
    );
  }
}


