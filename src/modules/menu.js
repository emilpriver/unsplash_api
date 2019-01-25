import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Menu extends Component {

    constructor(props){
        super(props)
        this.state = {
            results: '',
            results_loading: false,
            results_found: false,
            show_sign_in_element: false,
            sending_login_req: false,
            username: '',
            password: ''
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

    show_sign_in_element = () => {
        this.setState(prevState => ({
            show_sign_in_element: !prevState.show_sign_in_element
        }))
    }

    sign_user_in = () => {
        fetch('http://localhost:5000/api/users/sign_in', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then((response) => {
            if(response.status){
                cookies.set('_unsplash_user', response.token, {
                    path: '/' ,       
                }) 
                this.setState({
                    signed_in: true,
                })
            }else{
                this.setState({
                    signed_in: false,
                })
            }
        })
        .catch(err => {console.log(err)}) 
    }
    

  render() {
        let sign_in_element 
        if(this.state.show_sign_in_element){
                sign_in_element = <div id="sign_in_element">
                    <div className="wrapper">
                        <div className="col"></div>
                        <div className="col">
                            <div>
                                <h3>Sign In</h3>
                                <input type="text" placeholder="Username" onChange={(e) => this.setState({username: e.target.value})} />
                                <input type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})} />
                                <button onClick={this.sign_user_in}>Sign In <i className="fas fa-sign-in-alt"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
        }else{
            sign_in_element = ''
        }

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
                    {cookies.get('_unsplash_user') ? '' :  <button onClick={this.show_sign_in_element}>Sign In <i className="fas fa-sign-in-alt"></i></button> }
                </div>
           </div>
           {cookies.get('_unsplash_user') ? '' : sign_in_element}
        </header>
    );
  }
}


