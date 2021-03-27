import React from "react";
import { useDispatch, connect } from 'react-redux';
import { saveUser } from './userFormSlice';
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

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dob: yup.date().required(),
  phone: yup.string().min(7).required(),
  address: yup.string().required(),
  notes: yup.string(),
});

const mapStateToProps = (state, ownProps) => {
  console.log('ownProps', ownProps)

  return {
    c: 'just testing thanks',
  };
}

export function UserForm() {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    // resolver: yupResolver(schema),
  });

  const onSubmit = user => dispatch(saveUser({ user }));

  return (
    <>
      <div id={styles['user-table-actions']}>
        <Button leftIcon={<AddIcon />} onClick={onOpen}>Add User</Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
          <form>
            <ModalHeader>Add a new user</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl
                isRequired
                isInvalid={!!errors?.firstName?.message}
                errortext={errors?.firstName?.message}
              >
                <FormLabel>First name</FormLabel>
                <Input ref={register} name="firstName" />
                <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!errors?.lastName?.message}
                errortext={errors?.lastName?.message}
              >
                <FormLabel>Last name</FormLabel>
                <Input ref={register} name="lastName" />
                <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!errors?.dob?.message}
                errortext={errors?.dob?.message}
              >
                <FormLabel>Date of birth</FormLabel>
                <Input ref={register} name="dob" type="date" />
                <FormErrorMessage>{errors?.dob?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!errors?.phone?.message}
                errortext={errors?.phone?.message}
              >
                <FormLabel>Phone</FormLabel>
                <Input ref={register} name="phone" />
                <FormErrorMessage>{errors?.phone?.message}</FormErrorMessage>
              </FormControl>

              <FormControl
                isRequired
                isInvalid={!!errors?.address?.message}
                errortext={errors?.address?.message}
              >
                <FormLabel>Address</FormLabel>
                <Input ref={register} name="address" />
                <FormErrorMessage>{errors?.address?.message}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Notes</FormLabel>
                <Textarea placeholder="I need to remember this..." ref={register} name="notes" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default connect(mapStateToProps)(UserForm)