import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  saveUser,
  closeModal,
} from './userFormSlice';
import styles from './UserForm.module.css';

export function UserForm() {
  const dispatch = useDispatch();

  return (
    <div>
      <h3>User Form</h3>
    </div>
  );
}
