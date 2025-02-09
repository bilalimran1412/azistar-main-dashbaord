import React from 'react';
import { CompositeDecorator } from 'draft-js';
import { Text } from '@chakra-ui/react';

function findEntities(contentBlock, callback, contentState, entityType) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === entityType
    );
  }, callback);
}

const LinkDecorator = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  const handleClick = (e) => {
    e.preventDefault();
    window.open(url, '_blank');
  };
  return (
    <Text
      href={url}
      as='a'
      target='_blank'
      textColor='#66f'
      onClick={handleClick}
      cursor='pointer'
    >
      {props.children}
    </Text>
  );
};

const VariableTextDecorator = (props) => {
  return (
    <Text
      as='var'
      color='rgb(69, 72, 111)'
      bg='rgb(221, 222, 240)'
      p='1px 3px 2px'
      fontStyle='normal'
      fontSize='13px'
    >
      {props.children}
    </Text>
  );
};

export const decorators = new CompositeDecorator([
  {
    strategy: (contentBlock, callback, contentState) =>
      findEntities(contentBlock, callback, contentState, 'LINK'),
    component: LinkDecorator,
  },
  {
    strategy: (contentBlock, callback, contentState) =>
      findEntities(contentBlock, callback, contentState, 'AZISTAR_ENTITY'),
    component: VariableTextDecorator,
  },
]);
