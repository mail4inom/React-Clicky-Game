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
            message: "",
            statesImages: images,
          
            
        }
    }

    componentDidMount() {
        this.setState({
            message: "Click an image to begin!"
        })
     }

    handleItemClick = (clicked, id) => {  
        let img = this.state.statesImages.find( (img) => {
            return id === img.id;
        });

        console.log('img: ', img)
        
        if (img) {
          if (this.state.score === 12) {
            images.forEach(image => {
                image.clicked = false;
            });
                return this.setState({
                    score: 0,
                    statesImages: shuffleImages(this.state.statesImages),
                    topScore: 0,
                    statesImages: images,
                    message: "Congratulations, You won !!!",
                    
                })
            }
            if(!img.clicked ) {
                img.clicked = true;
                console.log("inside if: ", this.state.score)
                return this.setState({
                    statesImages: shuffleImages(this.state.statesImages),
                    score: this.state.score + 1,
                    message: "You guessed correctly!"
                });
            }
            else {
                images.forEach(image => {
                    image.clicked = false;
                });
                return this.setState({
                    score: 0,
                    statesImages: shuffleImages(this.state.statesImages),
                    topScore: (this.state.topScore < this.state.score) ? this.state.score : this.state.topScore,
                    statesImages: images,
                    message: "You guessed incorrectly!"
                })
            }
        } 
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                    <br/>
                        <div className="row">
                            <div className="col-sm-4 text-center">
                                <h2>Clicky Game!</h2>
                            </div>
                            <div className="col-sm-4 text-center">
                                <h2>{this.state.message}</h2>
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
                                <div className="col-sm-3 imageDiv" key={img.id}>
                                <button>
                                    <img 
                                        className="thumbnail" 
                                        onClick={() => this.handleItemClick(img.clicked, img.id)} 
                                        id={img.id} 
                                        alt="img1" src={img.image} 
                                    />
                                    </button>
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