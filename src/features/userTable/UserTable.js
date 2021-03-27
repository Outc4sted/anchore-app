import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  editUser,
  deleteUser,
} from './userTableSlice';
import styles from './UserTable.module.css';
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

  return (
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
            <Td>
              <IconButton aria-label="Edit user" icon={<EditIcon />} onClick={() => dispatch(editUser())}/>
              <IconButton aria-label="Delete user" icon={<DeleteIcon />} onClick={() => dispatch(deleteUser())}/>
            </Td>
          </Tr>
        )
        : <Tr>
            <Td colSpan="7">You have no favorite people :(</Td>
          </Tr>
      }
      </Tbody>
    </Table>
  );
}
