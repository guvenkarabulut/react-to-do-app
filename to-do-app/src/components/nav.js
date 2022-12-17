// create a nav component for react app with bootstrap only input and button
import React, { Component } from 'react'

class Nav extends Component {

    render() {
        return (
            <div className='row'>
                <div className='col-md-16'>
                    <div className='input-group mb-3'>
                        <input type='text' className='form-control' placeholder='Yapılacak İş' />
                        <div className='input-group-append'>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Nav
