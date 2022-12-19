import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import react icons
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import './card.css'

export class Card extends Component {
    // create state constructer for card component
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false
        }
    }

    render() {
        return (
            <div className='col-md-16 mb-4'>
                <div className='card'>
                    <div className='card-header d-flex justify-content-between'>
                        {/* // create a button and header text same line */}
                        {/* //create a button with react icons and bootstrap */}
                        <button type='button' className='btn btn-warning' onClick={() => {
                            this.setState({
                                isVisible: !this.state.isVisible
                            })
                        }}>
                            {this.state.isVisible ? <AiOutlineEyeInvisible /> : <AiFillEye />}
                        </button>
                        <h5 className='card-title'>{this.props.title}</h5>
                        <p className='see'></p>

                    </div>
                    <div className='card-body'>
                        {this.state.isVisible ? <p className='card-text'>{this.props.description}</p> : null}
                    </div>
                    <div className='card-footer'>
                        <button type='button' className='btn btn-success'>Yapıldı</button>
                    </div>
                </div>
            </div>

        )
    }
}
//create react props config for card component
Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}
//create react default props config for card component
Card.defaultProps = {
    title: 'Default Title',
    description: 'Default Description'
}

export default Card
