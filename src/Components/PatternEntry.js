import React, { Component } from 'react';

import { Rectangle } from 'react-rough';
import { getInfoAboutCurrentSquare } from '../PatternReader.service';


class PatternEntry extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props.pattern)

        this.state = {
            message: ""
        };
    }
    componentDidMount() {
    }

  render() {
    const { pattern, row } = this.props;
    return (
        <div className="PatternDisplay d-inline-block ml-3">
            <div className="message">{this.state.message}</div>
            <ul className="list-inline mb-0">
                {pattern.map((entry, i) => {
                    if (pattern.reduce((sum, entry) => sum + entry) < 1) {
                        // stop the empty row
                        return null
                    }

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
                        <li style={style} className={"entry list-inline-item " + (entry === 1 ? 'filled' : 'empty')}
                            key={i}
                            onMouseOver={() => this.mouseOver(pattern, i)}
                            onMouseOut={() => this.mouseOut()}
                        >
                            <Rectangle width={size} height={size} options={boxOptions} />
                        </li>
                    )
                })}
            </ul>
        </div>
    );
  }

    mouseOut() {
        this.setState({'message': ""})
    }
    mouseOver(currentLine, index) {
        this.setState({'message': getInfoAboutCurrentSquare(currentLine, index)})
  }
}

export default PatternEntry;
