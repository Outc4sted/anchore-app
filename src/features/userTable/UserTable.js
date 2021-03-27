import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  saveUser,
  closeModal,
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
} from "@chakra-ui/react"

export function UserTable() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch("https://my-json-server.typicode.com/Outc4sted/anchore-app/users")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setUsers(result);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     )
  // }, [])

  return (
    <>
      <h1>Your Favorite People</h1>
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
          }) => {
            <Tr>
              <Td>{firstName}</Td>
              <Td>{lastName}</Td>
              <Td>{dob}</Td>
              <Td>{phone}</Td>
              <Td>{address}</Td>
              <Td>{notes}</Td>
            </Tr>
          }) : <Tr><Td colspan="6">You have no favorite people :(</Td></Tr>
        }
        </Tbody>
      </Table>
    </>
  );
}
