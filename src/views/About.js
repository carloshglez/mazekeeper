import React from 'react';
import MdInfo from 'react-icons/lib/md/info'

export default class About extends React.Component {
    render() {
        return (
            <div>
                <div className='about'>
                    <h2>Maze Keeper</h2>
                    <img className='aboutImg' src={'./webapp/icon.png'}/>
                    <br/>Version {this.props.appversion}<br/>
                    <p>carloshglez &copy;2018</p>
                    <br/>
                    <button
                        className='infoButton'
                        onClick={this.props.gameSelect}>
                        Thanks for playing!
                    </button>
                </div>
            </div>
        );
    }
}
