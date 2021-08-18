import React from 'react'


const Form = props => {
    
    const { values, change, submit } = props;

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
            <form onSubmit={onSubmit}>
                <label>Name:&nbsp;
                    <input
                        name='name'
                        type='text'
                        value={values.name}
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
                        value={values.terms}
                        onChange={onChange}
                    />
                </label>

                <button>submit</button>
            </form>



        </div>
    )
}


export default Form;