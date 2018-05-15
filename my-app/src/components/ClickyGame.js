import React, { Component } from 'react';
import images from "../images.json";


const shuffleImages = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

class ClickyGame extends Component {

    constructor() {
        super()
        this.state = {
            score: 0,
            topScore: 0,
            statesImages: images
        }
    }

    handleItemClick = (clicked, id) => {
        // console.log(clicked)
        // console.log(id)
       
        let img = this.state.statesImages.find( (img) => {
            return id === img.id;
        });

        console.log('img: ', img)
        
        if (img) {
            if(!img.clicked) {
                img.clicked = true;
                console.log("inside if: ", this.state.score)
                return this.setState({
                    statesImages: shuffleImages(this.state.statesImages),
                    score: this.state.score + 1,
                });
            }
            else {
                images.forEach(image => {
                    image.clicked = false;
                });
                return this.setState({
                    score: 0,
                    topScore: (this.state.topScore < this.state.score) ? this.state.score : this.state.topScore,
                    statesImages: images
                })
            }
        } else if (this.state.topScore === 12) {
            return this.setState({
                score: 0,
                topScore: 0,
                statesImages: images
            })
        }
    }

    render() {
        console.log(this.state.statesImages)
        console.log(this.state.score)
        console.log(this.state.topScore)
        return (
            <div>
                <nav style={{background: '#00aef3', color: 'white'}} className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                    <br/>
                        <div className="row">
                            <div className="col-sm-4 text-center">
                                <h2>Clicky Game!</h2>
                            </div>
                            <div className="col-sm-4 text-center">
                                <h2>You Win!</h2>
                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-6 text-right">
                                        <h2>Score: {this.state.score} |</h2>
                                    </div>
                                    <div className="col-sm- text-left">
                                        <h2>Top Score: {this.state.topScore}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </div>
                </nav>
                <main className="container">
                    <div className="row">
                        {this.state.statesImages.map(img => {
                            return (
                                <div className="col-sm-3" key={img.id}>
                                    <img 
                                        className="thumbnail" 
                                        onClick={() => this.handleItemClick(img.clicked, img.id)} 
                                        id={img.id} 
                                        style={{ width: '220px', height: '220px' }} 
                                        alt="img1" src={img.image} 
                                    />
                                    <br /><br />
                                </div>
                            )
                        })}
                    </div>
                    <br /><br />
                </main>
            </div>
        )
    }
}

export default ClickyGame;