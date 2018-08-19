import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import Image from "./components/Image"
import "./ClickyGame.css";
import images from "./images.json";

class ClickyGame extends Component {
  state = {
    images,
    imageClickedId: [],
    score: 0,
    totalScore: 0,
    topScore: 0
  };

  handleImageChange = id => {
    var imageClickedId = this.state.imageClickedId;
    if (!imageClickedId.includes(id)) {
      imageClickedId.push(id)
      if (imageClickedId.length === 12) {
        this.setState({ score: 12, totalScore: 12, imageClickedId: [] });
        return;
      }
      if (this.state.score >= this.state.totalScore) {
        this.state.topScore = this.state.score + 1;
      }
      this.setState({ images, imageClickedId, score: imageClickedId.length, totalScore: this.state.topScore });
      for (var i = images.length - 1; i > 0; i--) {
        var j = Math.floor((Math.random() * (i)) + 0);
        [images[j], images[i]] = [images[i], images[j]];
      }

    } else {
      if (this.state.score < this.state.totalScore) {
        this.state.topScore = this.state.totalScore;
      }
      this.setState({ imageClickedId: [], score: 0, totalScore: this.state.topScore });
      return;
    }
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-logo">Clicky Game</h1>
          <p className="App-title">Click an image to begin!</p>
          <h1> Score: {this.state.score} <span> | </span> Top Score: {this.state.totalScore}</h1>
        </header>

        <Wrapper>
          {this.state.images.map(img => (
            <Image
              handleImageChange={this.handleImageChange}
              id={img.id}
              url={img.url}
            />
          ))}
        </Wrapper>
        <hr></hr>
        <p>Click on a pic to earn points, but don't click on any more than one!!! time!!!
          
        </p>
      </div>
    );
  }
}

export default ClickyGame;
