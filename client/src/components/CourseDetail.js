import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


const CourseDetail = ({context}) => {
  const [course, setCourse] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const [errors, setErrors] = useState([]);

  const { id } = useParams();
  let history = useHistory();

  const handleDelete = (event) => {
    const { emailAddress, password } = context.authenticatedUser;
    event.preventDefault();
    context.data.deleteCourse(id, emailAddress, password)
      .then( (status) => {
        if (status === 204) {
          // console.log(`${course.title} was successfully deleted!`);
          history.push('/courses');
        } 
        if (status === 403 || 401) {
          setErrors(() => {
            return { errors: [ "Only instructors can delete their courses" ] };
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

  useEffect(() => {
    context.data.getCourseDetail(id)
      .then(data => {
        setCourse(data)
        setInstructor(data.User)
      })
  }, [context, id])

  return (
    <main>
      <div className="actions--bar">
          <div className="wrap">
            { (context.authenticatedUser.id === course.userId)
              ? 
              <>
              <a className="button" href={`/courses/${id}/update`}>Update Course</a>
              <a className="button" href="#" onClick={handleDelete}>Delete Course</a>
              <a className="button button-secondary" href="/courses">Return to List</a>
              </>
              :
              <a className="button button-secondary" href="/courses">Return to List</a>
            }
              
          </div>
      </div>
            
      <div className="wrap">
          <h2>Course Detail</h2>
          {context.actions.showErrors(errors)}
          <form>
              <div className="main--flex">
                  <div>
                      <h3 className="course--detail--title">Course</h3>
                      <h4 className="course--name">{course.title}</h4>
                      <p>By {instructor.firstName} {instructor.lastName}</p>
                      <ReactMarkdown>{course.description}</ReactMarkdown>
                  </div>
                  <div>
                      <h3 className="course--detail--title">Estimated Time</h3>
                      <p>{course.estimatedTime}</p>

                      <h3 className="course--detail--title">Materials Needed</h3>
                      <ul className="course--detail--list">
                          <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                      </ul>
                  </div>
              </div>
           </form>
        </div>
    </main>
  );
}

export default CourseDetail;