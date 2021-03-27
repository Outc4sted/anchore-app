import React, { useState, useEffect } from 'react';
import styles from './UserTable.module.css';
import { useDispatch } from 'react-redux';
import {
  deleteUser,
} from './userTableSlice';
import { toggleUserForm } from '../userForm/userFormSlice';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
} from "@chakra-ui/react"
import {
  EditIcon,
  DeleteIcon,
} from "@chakra-ui/icons"

export function UserTable() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  const _editUser = userId => {
    const user = users.find(({ id }) => userId === id);
    console.log('_edit user', user)
    dispatch(toggleUserForm(user));
  };

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/Outc4sted/anchore-app/users")
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setUsers(result);
        },
        error => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error)
    return <div>Error: {error.message}</div>;

  else if (!isLoaded)
    return <div>Loading...</div>;

  else return (
    <Table variant="striped" colorScheme="blue">
      <TableCaption>This app brought to you by Justen Falk</TableCaption>
      <Thead>
        <Tr>
          <Th>First Name</Th>
          <Th>Last Name</Th>
          <Th>DOB</Th>
          <Th>Phone</Th>
          <Th>Address</Th>
          <Th>Notes</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.length ? users.map(({
          id: userId,
          firstName,
          lastName,
          dob,
          phone,
          address,
          notes,
        }) =>
          <Tr key={phone}>
            <Td>{firstName}</Td>
            <Td>{lastName}</Td>
            <Td>{dob}</Td>
            <Td>{phone}</Td>
            <Td>{address}</Td>
            <Td>{notes || 'n/a'}</Td>
            <Td className={styles['text-right']}>
              <IconButton
                className={styles['first-button']}
                aria-label="Edit user"
                icon={<EditIcon />}
                onClick ={() => _editUser(userId)}/>
              <IconButton
                aria-label="Delete user"
                icon={<DeleteIcon />}
                onClick={() => dispatch(deleteUser(userId))}/>
            </Td>
          </Tr>
        )
        : <Tr>
            <Td
              className={styles['text-center']}
              colSpan="7"
            >
              Where ya peeps at?
            </Td>
          </Tr>
      }
      </Tbody>
    </Table>
  );
}
