import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//Create form for updating course info
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
  
  //Function to update state values for each field as form data is edited
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

  //Function to submit form to update course info
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
      .then( errors => {
        if (errors.length) {
          setErrors({ errors });
        } else {
          // console.log(`${title} was successfully updated!`);
          history.push(`/courses/${id}`);
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      })
  }

  //Function to send users back to index if cancel is clicked
  const cancel = (event) => {
    event.preventDefault();
    history.push('/');
  }

  //When the page loads, get the existing course data and populate state variables to display the current course info
  useEffect(() => {
    context.data.getCourseDetail(id)
      .then(data => {
        //if the response is a 404, go to not found
        if (data === 404) {
          history.push('/notfound')
        } else {
          //only show course info if the course user id matches the auth user id, otherwise go to forbidden
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
  }, [context, id, history])


  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        {/* If errors are returned when submitting the form, they'll show here */}
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