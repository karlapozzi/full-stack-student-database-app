import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


const UpdateCourse = ({context}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);
  const [instructor, setInstructor] = useState([]);

  const { id } = useParams();
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
      // userId: context.authenticatedUser.id
    }

    context.data.updateCourse(course)
      .then( (status) => {
        console.log(status)
        if (status === 204) {
          console.log(`${title} was successfully updated!`);
          history.push(`/courses/${id}`);
        } 
        if (status === 403 || 401) {
          setErrors(() => {
            return { errors: [ "Only instructors can update their courses" ] };
          })
        } else {
          setErrors(() => {
            return { errors: [ "Something went wrong, try again later." ] };
          })
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

  useEffect(() => {
    context.data.getCourseDetail(id)
      .then(data => {
        setTitle(data.title)
        setDescription(data.description)
        setEstimatedTime(data.estimatedTime)
        setMaterialsNeeded(data.materialsNeeded)
        setInstructor(data.User)
      })
  }, [])


  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
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
                
                <p>By {instructor.firstName} {instructor.lastName}</p>

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
            <button className="button" type="submit">Update Course</button>
            <button className="button button-secondary" onClick={cancel}>Cancel</button>
        </form>
      </div>
    </main>
  );
}

export default UpdateCourse;