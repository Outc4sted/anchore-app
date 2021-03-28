import React from "react";
import { useDispatch, connect } from 'react-redux';
import {
  createUser,
  updateUser,
} from './userFormSlice';
import { getAllUsers } from '../userTable/userTableSlice';
import styles from './UserForm.module.css';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toggleUserForm } from './userFormSlice';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dob: yup.date().required(),
  phone: yup.string().min(7).required(),
  address: yup.string().required(),
  notes: yup.string(),
});

const mapStateToProps = ({ userForm }) => {
  let currentUser;

  if (userForm.user.firstName) {
    const d = new Date(userForm.user.dob)
    const datestring = d.getFullYear() + "-" + (d.getMonth()+1).toString().padStart(2,'0') + "-" + d.getDate().toString().padStart(2,'0')
    currentUser = { ...userForm.user, dob: datestring };
  }
  return {
    currentUser,
    openEditUser: userForm.openEditUser,
  }
}

const UserForm = ({ currentUser, openEditUser }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => dispatch(toggleUserForm({ forceToggle: false })),
  });
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const _createUser = user => {
    dispatch(onClose);
    dispatch(createUser({ user }));
    dispatch(getAllUsers());
  };

  const _updateUser = user => {
    user.id = currentUser.id
    dispatch(onClose);
    dispatch(updateUser({ user }));
    dispatch(getAllUsers());
  };

  return (
    <>
      <div id={styles['user-table-actions']}>
        <Button leftIcon={<AddIcon />} onClick={onOpen}>Add User</Button>
      </div>

      <Modal
        isOpen={isOpen || openEditUser}
        onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>Add a New User</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl
                isRequired
                isInvalid={!!errors?.firstName?.message}
                errortext={errors?.firstName?.message}
                className={styles['form-control']}
              >
                <FormLabel>First name</FormLabel>
                <Input
                  ref={register}
                  name="firstName"
                  defaultValue={currentUser?.firstName}
                />
                <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!errors?.lastName?.message}
                errortext={errors?.lastName?.message}
                className={styles['form-control']}
              >
                <FormLabel>Last name</FormLabel>
                <Input
                  ref={register}
                  name="lastName"
                  defaultValue={currentUser?.lastName}
                />
                <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!errors?.dob?.message}
                errortext={errors?.dob?.message}
                className={styles['form-control']}
              >
                <FormLabel>Date of birth</FormLabel>
                <Input
                  ref={register}
                  name="dob"
                  defaultValue={currentUser?.dob}
                  type="date"
                />
                <FormErrorMessage>{errors?.dob?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!errors?.phone?.message}
                errortext={errors?.phone?.message}
                className={styles['form-control']}
              >
                <FormLabel>Phone</FormLabel>
                <Input
                  ref={register}
                  name="phone"
                  defaultValue={currentUser?.phone}
                />
                <FormErrorMessage>{errors?.phone?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!errors?.address?.message}
                errortext={errors?.address?.message}
                className={styles['form-control']}
              >
                <FormLabel>Address</FormLabel>
                <Input
                  ref={register}
                  name="address"
                  defaultValue={currentUser?.address}
                />
                <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                className={styles['form-control']}
              >
                <FormLabel>Notes</FormLabel>
                <Textarea
                  placeholder="I need to remember this..."
                  ref={register}
                  name="notes"
                  defaultValue={currentUser?.notes}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              {openEditUser ?
                <Button colorScheme="blue" mr={3} onClick={handleSubmit(_updateUser)}>
                  Update
                </Button>
                :
                <Button colorScheme="blue" mr={3} onClick={handleSubmit(_createUser)}>
                  Save
                </Button>
              }
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default connect(mapStateToProps)(UserForm);