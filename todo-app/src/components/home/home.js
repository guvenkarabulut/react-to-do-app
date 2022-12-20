import React, { useEffect, useState } from 'react'
import db, { auth } from '../firebases'
import './home.css'
import Card from '../card/card';


function Home({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [email, setEmail] = useState()
  const [done, setDone] = useState()

  const [todolar, setTodolar] = useState([]);

  useEffect(() => {
    db.collection('todo').where('email', '==', user.email).where('done', '==', false).onSnapshot(snapshot => {
      setTodolar(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data() })))

    })
  }, [])

  const add = (e) => {
    e.preventDefault();
    db.collection('todo').add({
      title: title,
      content: content,
      email: user.email,
      done: false
    });
    setEmail();
    setTitle("");
    setContent("");
    setDone();
  }
  // create a state for react function component
  const [isVisible, setIsVisible] = useState(false)
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

      <form className='data-input'>
        <input
          className='form-control input'
          placeholder='Başlık'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className='form-control input'
          placeholder='Yapılacaklar'
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className='btn btn-outline-danger' onClick={add}>Gönder</button>
      </form>
      <div className='main-todo'>
        <div className="todo-goster">
          {todolar.map(({ id, todo }) => (
            <div className='todo' key={id}>
              <Card key={id} id={id} title={todo.title} description={todo.content} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
