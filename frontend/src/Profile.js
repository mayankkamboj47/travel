/* eslint-disable react/jsx-props-no-spreading */
import {
  Container, Heading, useEditableControls,
  ButtonGroup, IconButton, Flex, Editable, EditablePreview, EditableInput,
} from '@chakra-ui/react';
import { faCheck, faEdit, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { sampleDetailsCard } from './Card';

export default function Profile() {
  return (
    <Container maxW={1600}>
      <Heading display="inline-block" fontSize="2xl" pr="1rem">Welcome, </Heading>
      <EditableUsername />
      <Heading>Your Wishlist</Heading>
      {sampleDetailsCard}
      {sampleDetailsCard}
    </Container>
  );
}

function EditableUsername() {
  /* Here's a custom control */

  return (
    <Editable
      defaultValue="John Doe"
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
