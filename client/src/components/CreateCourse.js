import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateCourse = ({ context }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);

  const { firstName, lastName, emailAddress, password } = context.authenticatedUser;
  let history = useHistory();

  const change = (event) => {
    const target = event.target.name;
    const value = event.target.value;
    if (target === 'courseTitle'){
      setTitle(value)
    }
    if (target === 'courseDescription'){
      setDescription(value)
    }
    if (target === 'estimatedTime'){
      setEstimatedTime(value)
    }
    if (target === 'materialsNeeded'){
      setMaterialsNeeded(value)
    }
  }

  const submit = (event) => {
    event.preventDefault();

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded, 
      userId: context.authenticatedUser.id
    }

    context.data.createCourse(course, emailAddress, password)
      .then( errors => {
        if (errors.length) {
          setErrors({ errors });
        } else {
          // console.log(`${title} was successfully created!`);
          history.push('/courses');
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      })
  }

  const cancel = (event) => {
    event.preventDefault();
    history.push('/');
  }

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        {errors.errors ? 
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
          :
          <div></div>
        }
        <form onSubmit={submit}>
          <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input 
                  id="courseTitle" 
                  name="courseTitle" 
                  type="text" 
                  value={title}
                  onChange={change} />
                
                <p>By {firstName} {lastName}</p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription" 
                  name="courseDescription" 
                  value={description}
                  onChange={change}></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input 
                  id="estimatedTime" 
                  name="estimatedTime" 
                  type="text" 
                  value={estimatedTime}
                  onChange={change} />
                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded" 
                  name="materialsNeeded" 
                  value={materialsNeeded}
                  onChange={change}></textarea>
              </div> 
            </div>
            <button className="button" type="submit">Create Course</button>
            <button className="button button-secondary" onClick={cancel}>Cancel</button>
        </form>
      </div>
    </main>
  );
}

export default CreateCourse;