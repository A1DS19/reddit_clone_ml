import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { TbFlame, TbStack3 } from 'react-icons/tb';
import { TiStarburstOutline } from 'react-icons/ti';
import { CommunityResponse } from 'types/communities';
import { BiBarChartAlt2, BiRocket } from 'react-icons/bi';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { BsViewStacked } from 'react-icons/bs';
import { ImStack } from 'react-icons/im';

interface FilterRelevanceProps {
  selectedCommunity: CommunityResponse;
}

export const FilterRelevance: React.FC<FilterRelevanceProps> = ({
  selectedCommunity,
}) => {
  return (
    <Flex bgColor='white' borderRadius='md' padding={2} fontWeight='bold' color='gray'>
      <Flex
        mx={2}
        borderRadius='full'
        cursor='pointer'
        paddingY={2}
        paddingX={1}
        _hover={{ bgColor: 'blackAlpha.50' }}
      >
        <TbFlame fontSize={23} />
        <Text ml={1}>Hot</Text>
      </Flex>

      <Flex
        mx={2}
        borderRadius='full'
        cursor='pointer'
        paddingY={2}
        paddingX={1}
        _hover={{ bgColor: 'blackAlpha.50' }}
      >
        <TiStarburstOutline fontSize={23} />
        <Text ml={1}>New</Text>
      </Flex>

      <Flex
        mx={2}
        borderRadius='full'
        cursor='pointer'
        paddingY={2}
        paddingX={1}
        _hover={{ bgColor: 'blackAlpha.50' }}
      >
        <BiBarChartAlt2 fontSize={23} />
        <Text ml={1}>Hot</Text>
      </Flex>

      <Flex mx={2}>
        <Menu>
          <MenuButton
            as={Button}
            padding={0}
            bgColor='white'
            fontSize='xl'
            top={-1}
            borderRadius='full'
            _hover={{ bgColor: 'blackAlpha.50' }}
            _active={{ bgColor: 'white' }}
          >
            ...
          </MenuButton>
          <MenuList>
            <MenuItem>
              <BiRocket fontSize={20} />
              <Text ml={1} fontSize='sm'>
                Rising
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>

      <Flex mx='31em'>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            padding={1}
            bgColor='white'
            fontSize='xl'
            borderRadius='full'
            _hover={{ bgColor: 'blackAlpha.50' }}
            _active={{ bgColor: 'white' }}
          >
            <BsViewStacked />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <BsViewStacked fontSize={20} />
              <Text ml={1} fontSize='sm'>
                Card
              </Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              <ImStack fontSize={20} />
              <Text ml={1} fontSize='sm'>
                Classic
              </Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem>
              <TbStack3 fontSize={20} />
              <Text ml={1} fontSize='sm'>
                Compact
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
