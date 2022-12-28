import React, { useState } from 'react'
import db from '../firebases'
import './add.css'
import DateTimePicker from 'react-datetime-picker';
import { AiOutlinePlusCircle } from 'react-icons/ai';

function Add({ user }) {
    const [title, setTitle] = useState("");
    const [value, onChange] = useState(new Date());


    const add = () => {
        const id = db.collection('todo').doc().id;

        db.collection('todo').add({
            id: id,
            title: title,
            currentDate: Date(),
            date: value.getTime(),
            email: user.email,
            done: false
        }
        );

        setTitle("");
        const tasks = document.querySelector('.tasks');
        const inputs = tasks.querySelectorAll('input');
        const buttons = tasks.querySelectorAll('button');
        inputs.forEach((input, index) => {
            db.collection('tasks').add({
                id: id,
                content: input.value,
                done: false
            })
        })
        inputs.forEach((input) => {
            input.remove();
        })
        buttons.forEach((button) => {
            button.remove();
        })
    }


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <input
                        className='form-control input margin-aut'
                        placeholder='Başlık'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                    <button className='btn btn-outline-danger margin-aut' onClick={() => {
                        const tasks = document.querySelector('.tasks');
                        const area = document.createElement('div');
                        area.className = 'd-flex justify-content-between';

                        const input = document.createElement('input');
                        input.className = 'form-control input margin-aut';
                        input.placeholder = 'Task';
                        input.type = 'text';
                        const button = document.createElement('button');
                        button.className = 'btn btn-outline-danger';
                        button.innerText = 'X';
                        button.onclick = () => {
                            input.remove();
                            button.remove();
                        }
                        area.appendChild(input);
                        area.appendChild(button);
                        tasks.appendChild(area);
                    }}><AiOutlinePlusCircle /> </button>
                    <div className='tasks'>

                    </div>
                    <br />      <br />      <br />      <br />      <br />




                    <DateTimePicker className='dtpicker margin-aut' onChange={onChange} value={value} />
                    <br />
                    <button className='btn btn-outline-danger margin-aut' onClick={add}>Gönder </button>
                </div>
            </div>

        </div>
    )
}

export default Add
