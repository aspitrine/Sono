import React from 'react'
import { Switch, Route } from 'react-router-dom'
import List from './list';
import Show from './show';
import ShowSono from './showSono';
import Edit from './edit';

export default () => (
  <Switch>
    <Route exact path='/stage/list' component={List}/>
    <Route exact path='/' component={List}/>
    <Route path='/stage/show/:id' component={Show}/>
    <Route path='/stage/showSono/:id' component={ShowSono}/>
    <Route path='/stage/edit/:id' component={Edit}/>
    <Route path='/stage/edit' component={Edit}/>
  </Switch>
)
