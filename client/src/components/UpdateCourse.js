import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const UpdateCourse = ({context}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);
  const [instructor, setInstructor] = useState([]);

  const { id } = useParams();
  const { emailAddress, password } = context.authenticatedUser;
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
      userId: instructor.id
    }

    context.data.updateCourse(id, course, emailAddress, password)
      .then( (status) => {
        if (status === 204) {
          // console.log(`${title} was successfully updated!`);
          history.push(`/courses/${id}`);
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
        if (data === 404) {
          history.push('/notfound')
        } else {
          if (data.userId === context.authenticatedUser.id) {
            setTitle(data.title)
            setDescription(data.description)
            setEstimatedTime(data.estimatedTime)
            setMaterialsNeeded(data.materialsNeeded)
            setInstructor(data.User)
          } else {
            history.push('/forbidden');
          }
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      })
  }, [context, id])


  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        {context.actions.showErrors(errors)}
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