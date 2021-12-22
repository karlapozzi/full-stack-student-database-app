/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Courses from './components/Courses';
import withContext from './Context';

const CoursesWithContext = withContext(Courses);


export default () => (
  <Router>
    <div>
      <Switch>
        <Route path="/courses" component={CoursesWithContext} />
      </Switch>
    </div>
  </Router>
);

