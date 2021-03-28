import React, { useEffect } from 'react';
import styles from './UserTable.module.css';
import { useDispatch, connect } from 'react-redux';
import { deleteUserById, getAllUsers } from './userTableSlice';
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

const mapStateToProps = ({ userTable }) => {
  return {
    ...userTable,
    users: userTable.users.map(user => {
      const d = new Date(user.dob)
      const datestring = (d.getMonth()+1).toString().padStart(2,'0') + "-" + d.getDate().toString().padStart(2,'0') + "-" + d.getFullYear()
      return {
        ...user,
        dob: datestring,
      };
    })
  }
};

const UserTable = ({ users, isLoaded, error }) => {
  const dispatch = useDispatch();

  const editUser = userId => {
    const user = users.find(({ id }) => userId === id);
    dispatch(toggleUserForm(user));
  };
  const deleteUser = userId => {
    dispatch(deleteUserById({ userId }));
    dispatch(getAllUsers())
  };

  useEffect(() => dispatch(getAllUsers()), [dispatch]);

  if (error)
    return <div>Error: {error.message}</div>;

  else if (!isLoaded)
    return <div>Loading...</div>;

  else return (
    <div className={styles.['table-container']}>
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
            <Tr key={userId}>
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
                  onClick ={() => editUser(userId)}/>
                <IconButton
                  aria-label="Delete user"
                  icon={<DeleteIcon />}
                  onClick={() => deleteUser(userId)}/>
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
    </div>
  );
}

export default connect(mapStateToProps)(UserTable);
