import React, { useState } from 'react'
import db from '../firebases'
import './add.css'
import DateTimePicker from 'react-datetime-picker';
import { AiFillPlusCircle } from 'react-icons/ai'
import Button from 'react-bootstrap/Button';


function Add({ user }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [value, onChange] = useState(new Date());


    const add = (e) => {
        e.preventDefault();
        db.collection('todo').add({
            title: title,
            content: content,
            email: user.email,
            done: false
        });
        setTitle("");
        setContent("");

    }

    return (
        <div className='container'>
            <div className="dataInput">
                <input
                    className='form-control input margin-aut'
                    placeholder='Başlık'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <input
                    className='form-control input margin-aut'
                    placeholder='Yapılacaklar'
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br />
                <DateTimePicker className='dtpicker margin-aut' onChange={onChange} value={value} />
                <br />
                <Button className='btnplus' variant='secondary'><AiFillPlusCircle />
                </Button><br />
                <button className='btn btn-outline-danger margin-aut' onClick={add}>Gönder </button>
            </div>
        </div>
    )
}

export default Add
