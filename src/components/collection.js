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
        const {id}  = this.props.match.params


        
        fetch('https://api.unsplash.com/collections/'+id+'/photos?client_id=dd0d9301ea5cc3aa7b5a72de8e7791dc6c611871d92452efe1a18dbf77ddc9fc&per_page=15')
        .then(async (response) => {return await response.json()})
        .then(images => {
            console.log(images)
            setInterval(() => {
                this.setState({
                    images: images,
                    images_loaded: true
                })
            },0)
        })
        .catch(err => {})
    }



  render() {
    return (
        <div>
            <Nav />
            <section id="collection">
                <div className="con">             
                {this.state.images_loaded  ? 
                        <div className="wrapper">
                            {this.state.images.map((image,i) => {
                                return(
                                    <div key={i} className="collection" style={{backgroundImage: `url(${image.urls.regular})`}}>
                                        <a href={'/collection/' + image.id}> &nbsp;</a>
                                        <h3>{image.title}</h3>
                                    </div>
                                    )                                   
                                })}
                        </div>             
                    :   <div className="spinner"><div></div></div>}
                </div>           
            </section>
        </div>
    );
  }
}


