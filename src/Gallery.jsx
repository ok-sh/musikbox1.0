import React, { Component } from "react";
import "./App.css";

class Gallery extends Component {
  constructor(props){
    super(props);
    this.state = {
    playingUrl: "",
    playing: false,
    audioObject: null
    }
  }

  playAudio = (preview_url) => {
    let audioObject = new Audio(preview_url);
    if(!this.state.playing){
      audioObject.play();
      this.setState({
        play_symbol: false,
        playingUrl : preview_url,
        playing : true,
        audioObject
      })
      
    } else {
      if (preview_url === this.state.playingUrl){
        this.state.audioObject.pause();
        this.setState({
          play_symbol: false,
          playing : false
        })
      } else {
        this.state.audioObject.pause()
        audioObject.play()
        this.setState({
          play_symbol: true,
          playingUrl : preview_url,
          playing: true,
          audioObject
        })
      }
    }
    
  }
  render() {
    const { tracks } = this.props;  //grabs props shorthand in ES6
   return (
    <div>
        {tracks.map((track) => {
          const { id, name, album } = track;
          return (
            <div
              key={id}
              className='songs'
              onClick={() => this.playAudio(track.preview_url)}
            >
              <img
                src={album.images[1].url}
                className="track-img"
                alt="track-images"
              />
              <div className="tracks-box">
                <div className="track track-album">
                  <span>Lied: {name}</span>
                </div>
                <div className="track track-album">
                  <span>Album: {album.name}</span>
                </div>
                <div className="track track-link">
                  <a target="blank" href={album.external_urls.spotify}>
                    Link zu Spotify
                  </a>
                </div>
                <div className="track track-release">
                  <span>Veröffentlichung: {album.release_date}</span>
                </div>
                <div className="symbol">
                  
                { 
                (track.preview_url === this.state.playingUrl && this.state.playing === true) 
                  ? <span className="pause">| |</span>
                  : <span>&#9655;</span> 
                }  
                </div>
              
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Gallery;
