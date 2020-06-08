import React, { Component } from "react";
import { FormGroup, FormControl, InputGroup, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Profile from "./Profile";
import Gallery from "./Gallery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      artist: null,
      tracks: [],
    };
  }
  search() {
    const BASE_URL = "https://spotify-api-wrapper.appspot.com";
    let FETCH_URL = `${BASE_URL}/artist/${this.state.query}`;
    const ALBUM_URL = BASE_URL + "/artist/";
    fetch(FETCH_URL, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        const artist = json.artists.items[0];
        this.setState({ artist });

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks`;
        fetch(FETCH_URL)
          .then((response) => response.json())
          .then((json) => {
            const tracks = json.tracks;
            this.setState({ tracks });
          });
      })
      .catch((error) => console.log("error", error));
  }
  render() {
    return (
      <div className="App">
        <div className="App-title">Okans Musikbox</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Suchen nach Sänger..."
              value={this.state.query}
              onChange={(event) => {
                this.setState({ query: event.target.value });
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  this.search();
                }
              }}
            />
            <InputGroup.Append>
              <Button variant="dark" onClick={() => this.search()}>
                <FaSearch />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </FormGroup>

        {this.state.artist !== null ? (
          <div>
            <Profile artist={this.state.artist} />
            <Gallery tracks={this.state.tracks} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default App;
