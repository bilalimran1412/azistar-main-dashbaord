import React, { useState } from 'react';
import { EditorState, Modifier, RichUtils } from 'draft-js';
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import {
  FaBold,
  FaCode,
  FaHeading,
  FaItalic,
  FaLink,
  FaListOl,
  FaListUl,
  FaQuoteRight,
} from 'react-icons/fa';
import { MdClose, MdDone, MdOutlineEmojiEmotions } from 'react-icons/md';
import EmojiSelector from 'components/Shared/SidebarUi/EmojiSelector';
import { UiIconButton } from 'components/Shared/UiComponents';
import VariableInputField from '../../../../SidebarUi/VariableInputField';

const tools = [
  {
    label: 'bold',
    style: 'BOLD',
    icon: <Icon as={FaBold} />,
    method: 'inline',
  },
  {
    label: 'italic',
    style: 'ITALIC',
    icon: <Icon as={FaItalic} />,
    method: 'inline',
  },
  {
    label: 'Emoji',
    style: 'VAR',
    method: 'emoji',
    icon: <Icon as={MdOutlineEmojiEmotions} />,
  },
  {
    label: 'Code',
    style: 'CODEBLOCK',
    icon: <Icon as={FaCode} />,
    method: 'block',
  },
  {
    label: 'H',
    style: 'header-one',
    method: 'block',
    icon: <Icon as={FaHeading} />,
  },
  {
    label: 'Unordered-List',
    style: 'unordered-list-item',
    method: 'block',
    icon: <Icon as={FaListUl} />,
  },
  {
    label: 'Ordered-List',
    style: 'ordered-list-item',
    method: 'block',
    icon: <Icon as={FaListOl} />,
  },
  {
    label: 'Blockquote',
    style: 'blockQuote',
    icon: <Icon as={FaQuoteRight} />,
    method: 'block',
  },
];

const Toolbar = ({ editorState, setEditorState, type }) => {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  //for link toolbar
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState('');

  const toolbarRef = React.useRef(null);
  const applyStyle = (e, style, method) => {
    e.preventDefault();
    if (method === 'emoji') {
      setShowEmojiPicker(true);
      return;
    }
    method === 'block'
      ? setEditorState(RichUtils.toggleBlockType(editorState, style))
      : setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const isActive = (style, method) => {
    if (method === 'block') {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  const insertCharacter = (char) => {
    const currentContent = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();
    if (currentSelection.isCollapsed()) {
      try {
        const contentWithCharacter = Modifier.insertText(
          currentContent,
          currentSelection,
          char
        );
        const newEditorState = EditorState.push(
          editorState,
          contentWithCharacter,
          'insert-text'
        );

        setEditorState(newEditorState);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(
        'Selection is not collapsed. Please collapse the selection before inserting text.'
      );
    }
    setShowEmojiPicker(false);
  };

  const addEntity = (option) => {
    if (!option) {
      return;
    }
    const contentState = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();

    const contentStateWithEntity = contentState.createEntity(
      'AZISTAR_ENTITY',
      'IMMUTABLE',
      option
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    if (currentSelection.isCollapsed()) {
      const newContentState = Modifier.insertText(
        contentStateWithEntity,
        editorState.getSelection(),
        `${option?.label}`,
        null,
        entityKey
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        'insert-characters'
      );

      setEditorState(newEditorState);
    }
  };

  const promptForLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffset = selection.getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      setInputValue(url);
    }
  };

  const confirmLink = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: inputValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    let nextEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    nextEditorState = RichUtils.toggleLink(
      nextEditorState,
      nextEditorState.getSelection(),
      entityKey
    );

    setEditorState(nextEditorState);
  };
  const openLinkInput = () => {
    promptForLink();
    onOpen();
  };
  useOutsideClick({
    ref: toolbarRef,
    handler: () => {
      setShowEmojiPicker(false);
    },
  });

  return (
    <Flex position='relative' width='fit-content' ref={toolbarRef}>
      <Box mr={2} pos='relative'>
        <VariableInputField
          popupType='button'
          onSelect={addEntity}
          placeholder='fields'
        />
      </Box>
      {type !== 'inline' && (
        <>
          {tools.map((item, idx) => (
            <Button
              key={`${item.label}-${idx}`}
              title={item.label}
              onClick={(e) => applyStyle(e, item.style, item.method)}
              onMouseDown={(e) => e.preventDefault()}
              style={{
                color: isActive(item.style, item.method)
                  ? 'rgba(0, 0, 0, 1)'
                  : 'rgba(0, 0, 0, 0.3)',
                backgroundColor: isActive(item.style, item.method)
                  ? '#d3d3d3'
                  : 'transparent',
              }}
              minH='0'
              minW='0'
              width='25px'
              height='25px'
              marginRight='2px'
              borderRadius='2px'
              backgroundColor='transparent'
              mb='4px'
              padding='5px 10px'
              fontSize='12px'
              _hover={{
                backgroundColor: 'none',
              }}
              _active={{
                backgroundColor: 'transparent',
              }}
            >
              {item.icon || item.label}
            </Button>
          ))}
          <LinkInput
            onClose={onClose}
            onOpen={openLinkInput}
            isOpen={isOpen}
            isDisabled={editorState.getSelection().isCollapsed()}
            inputValue={inputValue}
            setInputValue={setInputValue}
            onConfirm={confirmLink}
          />
          {showEmojiPicker && (
            <Box position='absolute' zIndex={1}>
              <EmojiSelector setEmoji={insertCharacter} />
            </Box>
          )}
        </>
      )}
    </Flex>
  );
};

export default Toolbar;

const LinkInput = ({
  isDisabled,
  onClose,
  onOpen,
  isOpen,
  inputValue,
  setInputValue,
  onConfirm,
}) => {
  const linkRef = React.useRef(null);
  const _onClose = (e) => {
    e?.preventDefault();
    setInputValue('');
    onClose();
  };
  const handleConfirm = (e) => {
    e.preventDefault();
    onConfirm();
    _onClose();
  };

  useOutsideClick({
    ref: linkRef,
    handler: () => {
      setInputValue('');
      onClose();
    },
  });

  return (
    <Box position='relative' ref={linkRef}>
      <Button
        onClick={onOpen}
        onMouseDown={(e) => e.preventDefault()}
        color='rgba(0, 0, 0, 0.3)'
        minH='0'
        isDisabled={isDisabled}
        minW='0'
        width='25px'
        height='25px'
        marginRight='2px'
        borderRadius='2px'
        backgroundColor='transparent'
        mb='4px'
        padding='5px 10px'
        fontSize='12px'
        _hover={{
          backgroundColor: 'none',
        }}
        _active={{
          backgroundColor: 'transparent',
        }}
      >
        <Icon as={FaLink} />
      </Button>
      {isOpen && (
        <Flex
          position='absolute'
          top='-10px'
          left='-100px'
          alignItems='center'
          backgroundColor='white'
          color='black'
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Enter link'
            size='sm'
            height='30px'
            width='130px'
            variant='customMini'
          />
          <UiIconButton
            icon={<MdDone />}
            onClick={handleConfirm}
            aria-label='Confirm'
            size='sm'
            color='black'
            _hover={{
              backgroundColor: 'transparent',
            }}
          />
          <UiIconButton
            icon={<MdClose />}
            onClick={_onClose}
            aria-label='Cancel'
            color='black'
            size='sm'
            _hover={{
              backgroundColor: 'transparent',
            }}
          />
        </Flex>
      )}
    </Box>
  );
};
