import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


const CourseDetail = ({context}) => {
  const [course, setCourse] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    context.data.getCourseDetail(id)
        .then(data => {
          setCourse(data)
          setInstructor(data.User)
        })
  }, [])

  return (
    <main>
      <div className="actions--bar">
          <div className="wrap">
              <a className="button" href="update-course.html">Update Course</a>
              <a className="button" href="/delete-course">Delete Course</a>
              <a className="button button-secondary" href="/courses">Return to List</a>
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