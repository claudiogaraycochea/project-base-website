import React, { useState, useEffect } from 'react';
import { db } from '../../../Firebase';

export default function SignUp() {
  const initialStateValues = {
    firstname: '',
    lastname: ''
  };
  const [values, setValues] = useState(initialStateValues);

  const [users, setUsers] = useState([]);
  /*
  const getUsers = async () => {
    const querySnapshot = await db.collection('users').get();
    querySnapshot.forEach(doc=>{
      console.log(doc.data());
    })
  }*/

  const getUsersAutoUpdate = async () => {
    db.collection('users').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach(doc=>{
        // console.log(doc.data());
        // console.log(doc.id);
        docs.push({...doc.data(), id: doc.id});
      });
      setUsers(docs);
    });
  }

  useEffect(()=>{
    getUsersAutoUpdate();
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({...values, [name] : value})
  }

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    console.log('values: ', values);
    await db.collection('users').doc().set(values);
    console.log('new user added');
    setValues({...initialStateValues});
  }

  const onDeleteUser = (id) => {
    console.log(id);
    db.collection('users').doc(id).delete();
  }

  return (
    <div className="container">
      <div>
        <h1>Create</h1>
        <form onSubmit={handleCreateSubmit}>
          <input type='text' name='firstname' onChange={handleInputChange} value={values.firstname}/>
          <input type='text' name='lastname' onChange={handleInputChange} value={values.lastname}/>
          <button>Send</button>
        </form>
      </div>
      <hr/>
      <div>
        <h1>List</h1>
        <div>
          {users.map((user) => (
            <div className="box-item" key={user.id}>
              <div className="box-col">{user.firstname} {user.lastname}</div>
              <div className="box-col"><button onClick={() => onDeleteUser(user.id) }>Delete</button></div>
            </div>)
          )}
        </div>
      </div>
    </div>
  );
}
