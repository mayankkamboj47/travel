/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Container, Heading, useEditableControls,
  ButtonGroup, IconButton, Flex, Editable, EditablePreview, EditableInput,
  Spinner, Button, Box,
} from '@chakra-ui/react';
import { faCheck, faEdit, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cards } from './Card';
import useRemote from './hooks';
import { loadList } from './utils';
import { server } from './globals';

export default function Profile() {
  const navigate = useNavigate();
  const [data, loading, error] = useRemote(`${server}/user`);
  const [wishListData, wishListIsLoading, wishListError] = useRemote(`${server}/user/wishlist`);
  const [visitedData, visitedLoading, visitedError] = useRemote(`${server}/user/visited`);
  if (loading) return <Spinner />;
  if (data === null) {
    navigate('/login');
  }
  if (error) return <p>Cannot load profile</p>;
  const wishlist = loadList(
    wishListData,
    wishListIsLoading,
    wishListError,
    cards,
  );
  return (
    <Container maxW={1600}>
      <Heading display="inline-block" fontSize="2xl" pr="1rem">Welcome, </Heading>
      <EditableUsername defaultValue={data?.name || 'John Doe'} />
      <LogoutButton navigate={navigate} />
      <Box w="50%" float="left">
        <Heading>Your Wishlist</Heading>
        {wishlist}
      </Box>
      <Box w="44%" float="right">
        <Heading>Places you visited</Heading>
        {loadList(visitedData, visitedLoading, visitedError, cards)}
      </Box>
    </Container>
  );
}

function EditableUsername({ defaultValue }) {
  /* Here's a custom control */

  return (
    <Editable
      defaultValue={defaultValue}
      fontSize="2xl"
      isPreviewFocusable={false}
      display="inline-flex"
      style={{ gap: '1rem' }}
    >
      <EditablePreview />
      <EditableInput />
      <EditableControls />
    </Editable>
  );
}

function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup size="sm">
      <IconButton icon={<FontAwesomeIcon icon={faCheck} />} {...getSubmitButtonProps()} />
      <IconButton icon={<FontAwesomeIcon icon={faWindowClose} />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex>
      <IconButton size="sm" icon={<FontAwesomeIcon icon={faEdit} />} {...getEditButtonProps()} />
    </Flex>
  );
}

function LogoutButton({ navigate }) {
  return (
    <Button
      onClick={
        () => axios.get(`${server}/logout`, { withCredentials: true }).then(
          () => {
            localStorage.clear();
            navigate('/login');
          },
        )
      }
      display="block"
      bgColor="red.500"
    >
      Logout
    </Button>
  );
}
