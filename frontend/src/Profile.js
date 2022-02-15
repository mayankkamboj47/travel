/* eslint-disable react/jsx-props-no-spreading */
import {
  Container, Heading, useEditableControls,
  ButtonGroup, IconButton, Flex, Editable, EditablePreview, EditableInput,
  Spinner, Button,
} from '@chakra-ui/react';
import { faCheck, faEdit, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useRemote from './hooks';

export default function Profile() {
  const navigate = useNavigate();
  const [data, loading, error] = useRemote('http://localhost:3001/user');
  if (loading) return <Spinner />;
  if (data === null) {
    navigate('/login');
  }
  if (error) return <p>Something went wrong when loading the profile</p>;
  return (
    <Container maxW={1600}>
      <Heading display="inline-block" fontSize="2xl" pr="1rem">Welcome, </Heading>
      <EditableUsername defaultValue={data?.name || 'John Doe'} />
      <Button onClick={
        () => axios.get('http://localhost:3001/logout', { withCredentials: true }).then(
          () => navigate('/login'),
        )
      }
      display="block" bgColor="red.500">
        Logout
      </Button>
      <Heading>Your Wishlist</Heading>
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
