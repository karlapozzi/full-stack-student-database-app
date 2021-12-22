/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import withContext from './Context';

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);


export default () => (
  <Router>
    <div>
      <Switch>
        <Redirect exact from='/' to='/courses' />
        <Route exact path="/courses" component={CoursesWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
      </Switch>
    </div>
  </Router>
);

