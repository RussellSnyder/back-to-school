import React, { Component } from 'react';

import PatternEntry from './PatternEntry';

class PatternGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAllPatterns: false,
        };

        // this.handleClick = this.handleClick.bind(this);
    }


  render() {
    const { name, sequences } = this.props;

      const firstPattern =  (
        <div className="sequence">
            <span>1) </span><PatternEntry key={1} pattern={sequences.iterations[0]} />
        </div>
        );

      const allPatterns = sequences.iterations.map((sequence, i) => {
            return (
                <div className="sequence">
                    <span style={{width: '40px', float: 'left'}}>{i + 1}) </span><PatternEntry key={i} pattern={sequence} />
                </div>

          )
      })



      return (
        <div className="PatternGroup">
            <div className="pt-3 mb-3 pattern-section">
                <h4>{name} <small className="float-right">(type: <strong>{sequences.patternType.join(", ")}</strong>)</small></h4>
                {this.state.showAllPatterns ?
                    <a onClick={(e) => this.handleClick(e)}
                       className="btn show-all btn-outline-secondary btn-sm">
                        Hide
                    </a>
                    : null}
                {this.state.showAllPatterns ? allPatterns : firstPattern}
                <a onClick={(e) => this.handleClick(e)}
                   className="mt-2 btn show-all btn-outline-secondary btn-sm">
                    {this.state.showAllPatterns ? "Hide" : "Show 100 Interations"}
                </a>
            </div>
        </div>
    );

  }

  handleClick() {
        this.setState({showAllPatterns: !this.state.showAllPatterns})
    }

}

export default PatternGroup;
