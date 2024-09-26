import React from 'react'
import styled from 'styled-components'

const Form = props => {
    
    const { values, change, submit, disabled, errors} = props;


    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    }

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
      }

    return (
        <div>
            <div className='container'>
                <h1>Add Your Info!</h1>
                <form onSubmit={onSubmit} className='formContainer'>
                    <div className='errors'>
                        <div>{errors.first_name}</div>
                        <div>{errors.last_name}</div>
                        <div>{errors.email}</div>
                        <div>{errors.password}</div>
                        <div>{errors.terms}</div>
                    </div>
                    <label>First Name:&nbsp;
                        <input
                            name='first_name'
                            type='text'
                            value={values.first_name}
                            onChange={onChange}
                        />
                    </label>
                    <label>Last Name:&nbsp;
                        <input
                            name='last_name'
                            type='text'
                            value={values.last_name}
                            onChange={onChange}
                        />
                    </label>
                    <label>Email:&nbsp;
                        <input
                            name='email'
                            type='email'
                            value={values.email}
                            onChange={onChange}
                        />
                    </label>
                    <label>Password:&nbsp;
                        <input
                            name='password'
                            type='password'
                            value={values.password}
                            onChange={onChange}
                        />
                    </label>
                    <label>Terms of Service:&nbsp;
                        <input 
                            type='checkbox'
                            name='terms'
                            checked={values.terms}
                            onChange={onChange}
                        />
                    </label>

                    <button disabled={disabled}>submit</button>
                </form>  
            </div>        
        </div>
    )
}


export default Form;