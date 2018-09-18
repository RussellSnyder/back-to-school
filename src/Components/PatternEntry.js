import React, { Component } from 'react';

import { Rectangle } from 'react-rough';


class PatternEntry extends Component {
    // constructor(props) {
    //     super(props);
        // // console.log(this.props.pattern)
        //
        // this.state = {
        //     pattern: this.props.pattern
        // };
    // }
    componentDidMount() {
    }

  render() {
    const { pattern } = this.props;
    return (
        <div className="PatternDisplay d-inline-block ml-3">
            <ul className="list-inline mb-0">
                {pattern.map((entry, i) => {
                    let size = Math.max(Math.ceil(100 / (pattern.length / 5)), 6);
                    let style={width: size,
                        height: size,
                        margin: 1
                    }
                    let boxOptions = {data: [0,0, size, size],
                        fill: entry === 1 ? 'grey' : 'transparent',
                        hachureAngle: -45 + Math.random() * 5, // angle of hachure,
                        hachureGap: 4,
                        roughness: 0.8,
                        fillWeight: Math.random() + 0.75
                    };

                    return (
                        <li style={style} className={"entry list-inline-item " + (entry === 1 ? 'filled' : 'empty')} key={i}>
                            <Rectangle width={size} height={size} options={boxOptions}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
  }
}

export default PatternEntry;
