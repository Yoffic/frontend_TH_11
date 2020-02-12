import React, { Component } from 'react';
import axios from 'axios';
import apiKey from '../config';
import ImageList from './ImageList';

export default class Gallery extends Component {
  state = {
    images: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.props.keyword}&safe_search=1&content_type=1&per_page=12&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          images: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <h2>Loading...</h2>
        );
    }

    return (
      <div className="photo-container">
        <h2>{this.props.keyword} results</h2>
        <ImageList images={this.state.images}/>
      </div>
    );
  }
}
