import * as types from "./actionTypes";
import fetch from 'node-fetch';
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return new Promise((resolve, reject) => {
      fetch(process.env.API_URL + '/api/authors')
        .then(res => res.json())
        .then(body => {
          console.log(body);
          resolve(body);
        })
        .catch(error => {
          reject(error)
        })
    });
  };
}
