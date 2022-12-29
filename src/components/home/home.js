import React, { useEffect, useState } from 'react'
import db, { auth } from '../firebases'
import './home.css'
import Card from '../card/card'
import Add from '../add/add'
import { Form, ListGroup } from 'react-bootstrap'

function Home({ user }) {

  const [isVisible, setIsVisible] = useState(false)
  const [isVisibleEkle, setIsVisibleEkle] = useState(false)
  const [todolar, setTodolar] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let a
    if (filter === 'true') { a = true }
    else if (filter === 'false') { a = false }
    if (filter === 'all') {
      db.collection('todo').where('email', '==', user.email).onSnapshot(snapshot => {
        setTodolar(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data() })))
      })
    }
    else {
      db.collection('todo').where('email', '==', user.email).where('done', '==', a).onSnapshot(snapshot => {
        setTodolar(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data() })))
      })
    }
  }, [filter])

  const getTasks = (id) => {
    let tasks = []
    db.collection('tasks').where('taskId', '==', id).onSnapshot(snapshot => {
      tasks.push(snapshot.docs.map(doc => ({ id: doc.id, task: doc.data() })))
    }
    )
    return tasks
  }
  return (
    <div className='home'>
      <div className='nav'>
        <img className='profile-image' src={user.photoURL} onClick={() => { setIsVisible(!isVisible) }}></img>
        <div className='account-info'>{isVisible ? <h5>{user.displayName}</h5> : null}{isVisible ? <button className='btn btn-outline-warning' onClick={() => auth.signOut()}>Log Out</button> : null}
        </div>
      </div>

      <button className='btn btn-outline-danger' onClick={() => { setIsVisibleEkle(!isVisibleEkle) }} >Add Task</button>
      {isVisibleEkle ? <Add user={user} /> :
        < div className='content row'>
          <div className='col-2 d-flex justify-content-start'>
            <div className='menu'>
              {/*   <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="text" placeholder="Search" />
                </Form.Group>
              </Form> */}
              <ListGroup>
                <ListGroup.Item action variant="warning" onClick={() => { setFilter('all') }}>All</ListGroup.Item>
                <ListGroup.Item action variant="warning" onClick={() => { setFilter('false') }}>Not Done</ListGroup.Item>
                <ListGroup.Item action variant="warning" onClick={() => { setFilter('true') }}>Done</ListGroup.Item>
              </ListGroup>
            </div>
          </div>
          <div className='col-10'>
            <div className='main-todo'>
              <div className="todo-goster">
                {todolar.map(({ id, todo }) => (
                  <div className='todo' key={id}>
                    <Card key={id} mainId={id} id={todo.id} title={todo.title} content={getTasks(todo.id)} done={todo.done} date={todo.date} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    </div >
  )
}

export default Home
