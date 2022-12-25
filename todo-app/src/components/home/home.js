import React, { useEffect, useState } from 'react'
import db, { auth } from '../firebases'
import './home.css'
import Card from '../card/card';
import Add from '../add/add';

function Home({ user }) {
  const [todolar, setTodolar] = useState([]);

  useEffect(() => {
    db.collection('todo').where('email', '==', user.email).onSnapshot(snapshot => {
      setTodolar(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data() })))

    })
  }, [])


  // create a state for react function component
  const [isVisible, setIsVisible] = useState(false)
  const [isVisibleEkle, setIsVisibleEkle] = useState(false)

  return (
    <div className='home'>

      <div className='nav'>

        <img className='profile-image' src={user.photoURL} onClick={() => {
          setIsVisible(!isVisible)
        }
        }></img>
        <div className='account-info'>
          {isVisible ?
            <h5>{user.displayName}</h5> : null}
          {isVisible ?
            <button className='btn btn-outline-warning' onClick={() => auth.signOut()}>
              Log Out
            </button> : null}
        </div>
      </div>
      <button className='btn btn-outline-danger' onClick={() => {
        setIsVisibleEkle(!isVisibleEkle)
      }} >Add Task</button>

      {isVisibleEkle ? <Add user={user} /> : <div className='main-todo'>
        <div className="todo-goster">
          {todolar.map(({ id, todo }) => (
            <div className='todo' key={id}>
              <Card key={id} id={id} title={todo.title} description={todo.content} done={todo.done} date={todo.date} />
            </div>
          ))}
        </div>
      </div>}

    </div>
  )
}

export default Home
