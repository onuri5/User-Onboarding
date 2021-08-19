import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Form from './Form/Form.js';

const initialFormValues = {
  first_name: '', 
  last_name: '',
  email: '', 
  password: '',
  terms: false,
  test: false
}

function App() {
  const [workers, setWorkers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)

  const getData = () => {
    axios.get('https://reqres.in/api/users')
      .then(res => {
        setWorkers(res.data.data)
      })
  }

  const postNewWorker = newWorker => {
    axios.post('https://reqres.in/api/users', newWorker)
      .then(res => {
        setWorkers([res.data, ...workers])
      }).catch(err => console.error(err));

    setFormValues(initialFormValues);
  }

  const inputChange = (name, value) => {
    setFormValues({
      ...formValues, [name]: value
    })
  }

  const formSubmit = () => {
    const newWorker = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: ['terms'].filter(test => !!formValues[test])
    }
    postNewWorker(newWorker);
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
     <Form 
      values={formValues}
      change={inputChange}
      submit={formSubmit}
    />
     {workers !== undefined ? workers.map(worker => {
      return <div>
          <h3>{`${worker.first_name} ${worker.last_name}`}</h3>
          <p>{`${worker.email}`}</p>
        </div>
     }) : ''}
    </div>
  );
}

export default App;
