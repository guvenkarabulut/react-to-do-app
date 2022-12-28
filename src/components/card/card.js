import React, { Component } from 'react'
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { TiTickOutline } from 'react-icons/ti'
import { BsClockHistory } from 'react-icons/bs'
import './card.css'
import db from '../firebases'
import { Form } from 'react-bootstrap'

const diffTime = (date) => {
    const currentDate = new Date().getTime();
    const diff = date - currentDate;
    const diffHours = Math.round((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffHours < 4) {
        return 'btn btn-danger disabled d-flex align-items-center'
    }
    else {
        return 'btn btn-success disabled d-flex align-items-center'
    }
}
/* const getTask = (value) => {
    if (value === true || value === false) {
        return null
    }
    else {
        return (
            <div className='alert alert-danger d-flex justify-content-between' >
                <Form.Check
                    type="checkbox"
                    id={`default-switch`}
                    className='d-flex align-items-center'
                   
                />
                <p>{value}</p>
            </div>
        )
    }
} */


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
                <div className={this.props.done ? 'card border-danger mb-3' : 'card border-warning'}>
                    <div className='card-header d-flex justify-content-between'>
                        <button type='button' className={this.props.done ? 'btn btn-danger d-flex align-items-center' : 'btn btn-warning d-flex align-items-center'} onClick={() => {
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
                        {this.state.isVisible ? this.props.content.map((value, index) => {
                            return (
                                <div className='alert alert-danger d-flex justify-content-between' key={index}>
                                    <Form.Check
                                        type="checkbox"
                                        id={`default-switch`}
                                        className='d-flex align-items-center'
                                        checked={value.done}
                                        onChange={(e) => {
                                            db.collection('tasks').doc(value.id).update({
                                                done: e.target.checked
                                            })
                                        }}
                                    />
                                    <p>{value.task.content}</p>
                                </div>
                            )
                        }) : null
                        }
                    </div>
                    <div className='card-footer d-flex justify-content-between'>
                        <button type='button' className={this.props.done ? 'btn btn-success disabled d-flex align-items-center' : 'btn btn-success d-flex align-items-center'} onClick={() => {//'btn btn-success'
                            db.collection('todo').doc(this.props.id).update({
                                done: true
                            })
                        }}><TiTickOutline /></button>
                        <button type='button' className={diffTime(this.props.date)}> <BsClockHistory /> </button>
                    </div>
                </div>
            </div >

        )
    }
}

export default Card
