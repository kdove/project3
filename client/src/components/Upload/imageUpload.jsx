import React, { Component } from 'react';
import {storage} from '../../firebase'

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: "",
            progress: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        console.log(this.state); 
    }

       
    handleChange = e => {
        console.log(e.target.files[0]);
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({image}));
        }
    }
    
    handleUpload = () => {
        const {image} = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on('state_changed',
        // progress function
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            this.setState({progress});
        },
        // error function
        (error) => {
            console.log(error);
        },
        // complet function
        () => {
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log(url);
                this.setState({url});
            })
        });
    }

    render() {
        const style = {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems:'center',
            justifyContent: 'center'
        };
        return (
            <div style = {style}>
                <progress value = {this.state.progress} max = "100"/>
                <input type = "file" onChange = {this.handleChange}/>
                <button onClick = {this.handleUpload}>Upload</button>
                <br/>
                <img src = {this.state.url || 'https://via.placeholder.com/400x300'} alt = "Upload Images" height = "300" width = "400"/>
            </div>
        )
    }
}

export default ImageUpload;