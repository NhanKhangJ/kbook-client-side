import { combineReducers } from '@reduxjs/toolkit';
import posts from './posts';
import auth from './auth';
import users from './users'
export default combineReducers({
  posts,
  auth,
  users
})