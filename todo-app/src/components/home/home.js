import React, { useEffect, useState } from 'react'
import db, { auth } from '../firebases'
import './home.css'
import Card from '../card/card';
function Home({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [todolar, setTodolar] = useState([]);

  useEffect(() => {
    db.collection('todo').onSnapshot(snapshot => {
      setTodolar(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data() })))
    })
  }, [])

  const add = (e) => {
    e.preventDefault();
    db.collection('todo').add({
      title: title,
      content: content,
    });
    setTitle("");
    setContent("");
  }
  return (
    <div className='home'>
      <h1>Hoşgeldiniz {user.displayName}</h1>
      <button onClick={() => auth.signOut()}>
        çıkış yap
      </button>
      <br />
      <br />
      <br />

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
      <div className="todo-goster">
        {todolar.map(({ id, todo }) => (
          <div className="todo" key={id}>
            <Card title={todo.title} description={todo.content} />
          </div>
        ))}

      </div>
    </div>
  )
}

export default Home
