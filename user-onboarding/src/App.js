import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Form from './Form/Form.js';
import * as yup from 'yup';
import schema from './validation/formSchema';

const initialFormValues = {
  first_name: '', 
  last_name: '',
  email: '', 
  password: '',
  terms: false
}

const initialFormErrors = {
  first_name: '', 
  last_name: '',
  email: '', 
  password: '',
  terms: false
}

const initialDisabled = true

function App() {
  const [workers, setWorkers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled) 

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

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({...formErrors, [name]: '' }))
      .catch(err => setFormErrors({...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    validate(name, value)
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
      terms: !!formValues.terms
    }
    postNewWorker(newWorker);
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid));
  }, [formValues])

  

  return (
    <div className="App">
     <Form 
      values={formValues}
      change={inputChange}
      submit={formSubmit}
      disabled={disabled}
      errors={formErrors}
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
