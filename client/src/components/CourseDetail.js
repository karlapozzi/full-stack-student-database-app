import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

//Show an individual course
const CourseDetail = ({context}) => {
  const [course, setCourse] = useState([]);
  const [instructor, setInstructor] = useState([]);

  const { id } = useParams();
  let history = useHistory();

  //Function for delete button, if delete is successful it redirects back to /courses
  const handleDelete = (event) => {
    const { emailAddress, password } = context.authenticatedUser;
    event.preventDefault();
    context.data.deleteCourse(id, emailAddress, password)
      .then( (status) => {
        if (status === 204) {
          // console.log(`${course.title} was successfully deleted!`);
          history.push('/courses');
        } 
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      })
  }

  //When the page is loaded, get courses details from the API and set state variables to render in the HTML
  useEffect(() => {
    context.data.getCourseDetail(id)
      .then(data => {
        //if the response is a 404 go to not found, else populate course info
        if (data === 404) {
          history.push('/notfound')
        } else {
        setCourse(data)
        setInstructor(data.User)
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      })
  }, [context, id, history])

  return (
    <main>
      <div className="actions--bar">
          <div className="wrap">
            {/* if there is an authenticated user AND their id matches the course id, show Update and Delete buttons */}
            { (context.authenticatedUser && context.authenticatedUser.id === course.userId)
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