import React from 'react';

const emailExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const startsWithHttp = /^http/;
const dateFormatExpr = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
const timeFormatExpr = /^[0-9]{2}:[0-9]{2}$/;


export const dateToInput = (dateString) => {
  const date = new Date(dateString);

  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  return `${day}/${month}/${date.getFullYear()}`;
};

export const timeToInput = (dateString) => {
  const date = new Date(dateString);

  let hours = date.getHours();
  hours = hours < 10 ? `0${hours}` : hours;

  let minutes = date.getMinutes() + 1;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes}`;
};

export const divideInRows = (arr, itemFn, numPerRow = 3) => {
  return arr.map(item =>
    itemFn(item)
  )
  .reduce((acc, item, index) => {
    index % (numPerRow + 1) < numPerRow ? acc[acc.length - 1].push(item) : acc.push([item]);
    return acc;
  }, [[]])
  .map((arr, index) =>
    <div className="columns" key={index}>
      {[...arr]}
    </div>
  )
};

const validateDefaultMaxMin = (field) => {
  if(!field)
    return 'Field is required';
  else if(field.toString().length < 3)
    return 'Field is too short';
  else if(field.toString().length > 20)
    return 'Field is too long';
};

const validateUrl = (url) => {
  if(!url)
    return 'Field is required';
  else if(!startsWithHttp.test(url))
    return 'Url should start with http';
};

const validateEmail = (email) => {
  if(!email)
    return 'Email is required';
  else if(!emailExp.test(email))
    return 'Email is not valid';
};

const validateDate = (date) => {
  if(!date)
    return 'Date is required';
  if(!dateFormatExpr.test(date))
    return 'No valid date format';
};

const validateDateEnd = (date, startDate) => {
  if(!date)
    return 'Date is required';
  if(!dateFormatExpr.test(date))
    return 'No valid date format';
  if(date <= startDate)
    return 'Date should be after start date'
};

const validateTime = (time) => {
  if(!time)
    return 'Field is required';
  else if(!timeFormatExpr.test(time))
    return 'Time format is not correct';
};

export const validateLoginForm = ({ email, password }) => {
  return {
    email: !email ? 'An email is required' : undefined,
    password: !password ? 'A password is required': undefined
  }
};

export const validateRegisterForm = ({ username, publicName, picture, email, password, passwordConfirmation, bio }) => ({
  username: validateDefaultMaxMin(username),
  publicName: validateDefaultMaxMin(publicName),
  picture: validateUrl(picture),
  email: validateEmail(email),
  password: validateDefaultMaxMin(password),
  passwordConfirmation: validateDefaultMaxMin(passwordConfirmation) || ((password !== passwordConfirmation) ? 'Not equal to password' : undefined),
  bio: validateDefaultMaxMin(bio)
});

export const validateConferenceForm = ({city, country, description, startDate, endDate, logo, name, website}) => ({
  city: validateDefaultMaxMin(city),
  country: country && country.length === 3 ? undefined : 'Field should be 3 characters long',
  description: validateDefaultMaxMin(description),
  startDate: validateDate(startDate),
  endDate: validateDateEnd(endDate, startDate),
  logo: validateUrl(logo),
  name: validateDefaultMaxMin(name)
});


export const validateTalkForm = ({title, description, room, startsAt}) => ({
  title: validateDefaultMaxMin(title),
  description: validateDefaultMaxMin(description),
  startsAt: validateTime(startsAt)
});

export const errorPropsConfig = {
  className: 'help is-danger'
};