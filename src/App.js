import React, { Component } from 'react';

import './App.css';

import { convertToBinary, determineNextLine, determineSequenceTypes } from './PatternReader.service';

import PatternGroup from './Components/PatternGroup';

const AboutMe =
    <div className="col-12">
        <p>
            Hello Wunderdog! I had a chat with Jasper about working more with your company.
            If you like this little react app, maybe we can work together!
        </p>
        <p>
            Please note that I decided that if portions of a pattern gradually offset themselves (instead of just the whole), I considered it of the 'gliding' type.
        </p>
        <p>
            I used a library called Rough.JS for the hand drawn effects ;-)
        </p>
    </div>

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null,
            binaryPatterns: [],
            sequences: [],
            readmore: false
        };
    }

    componentDidMount() {
        fetch('./data/patterns.txt')
            // get text
            .then(r => r.text())
            // convert to string to get line breaks
            .then(r => JSON.stringify(r))
            // convert to array
            .then(r => r.split('\\r\\n'))
            // convert to binary for easier maths
            .then(r => convertToBinary(r))
            .then(r => this.setState({binaryPatterns: r}))
            .then(r => {
                let sequences = [];
                // console.log(this.state.binaryPatterns[0]);
                this.state.binaryPatterns.map((pattern, i) => {
                    sequences[i] = new Object({
                        name: "",
                        patternType: "",
                        // first 100 cycles
                        iterations: [
                            []
                        ]
                    });
                    sequences[i].name = "Sequence " + i;
                    for (let j = 0; j < 100; j++) {
                        if (j === 0) {
                            sequences[i].iterations[j] = pattern;
                        } else {
                            sequences[i].iterations[j] = determineNextLine(sequences[i].iterations[j - 1]);
                        }
                    }
                    sequences[i].patternType = determineSequenceTypes(sequences[i]);

                })
                this.setState({sequences : sequences})
            })
    }



  render() {
    const { binaryPatterns, sequences } = this.state;

      const patterns = sequences.length > 0 ?
          binaryPatterns.map((pattern, i) => {
              return (
                <PatternGroup
                    key={i}
                    name={'Pattern #' + (i + 1)}
                    sequences={sequences[i]}
                />
              )}
        ) : "loading...";

    return (
      <div className="App container">

        <header className="row p-4 text-center jumbotron" >
          <h1 className="col-12">Back To School</h1>
            <h2 className="col-12 mb-4">Wunderpähkinä vol. 9</h2>
                <p className="col-12 mx-auto">by <a target="_blank" href="http://russellsnyder.io/">Russell Snyder</a></p>
                {this.state.readmore ? AboutMe : null}
                <br/>
                <a onClick={(e) => this.handleClick(e)}
                   className="col-12 col-md-4 mx-auto mt-2 btn btn-outline-secondary btn-sm">
                    {this.state.readmore ? "Read Less" : "Read About Me"}
                </a>

        </header>
        <div id="results" className="pb-4 pt-2">
            {patterns}
        </div>
      </div>
    );
  }
    handleClick() {
        this.setState({readmore: !this.state.readmore})
    }

}

export default App;
