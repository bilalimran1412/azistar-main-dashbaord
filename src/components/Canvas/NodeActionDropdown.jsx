import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { FiMoreHorizontal, FiCopy, FiRefreshCw, FiTrash } from 'react-icons/fi';

const NodeActionDropdown = ({
  onCopy,
  onReplace,
  onDelete,
  onDuplicate,
  onCopyId,
  nodeId,
}) => {
  return (
    <Menu closeOnBlur={true}>
      <Tooltip label='Options' aria-label='Options Tooltip'>
        <MenuButton
          as={IconButton}
          icon={<FiMoreHorizontal />}
          variant='outline'
          sx={{
            minW: 0,
            border: 'none',
            h: '22px',
            w: '36px',
            _hover: { bg: 'gray.100' },
            _active: { bg: 'gray.200' },
          }}
        />
      </Tooltip>
      <MenuList>
        <MenuItem icon={<FiCopy />} onClick={onCopy}>
          Copy Node
        </MenuItem>
        <MenuItem icon={<FiRefreshCw />} onClick={onReplace}>
          Replace Node
        </MenuItem>
        <MenuItem icon={<FiTrash />} color='red.500' onClick={onDelete}>
          Delete Node
        </MenuItem>
        <MenuItem icon={<FiCopy />} onClick={onDuplicate}>
          Duplicate Node
        </MenuItem>
        <MenuItem icon={<FiCopy />} onClick={onCopyId}>
          Copy Block ID
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NodeActionDropdown;
