import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react';
import React from 'react';
import {
  AiOutlineFileImage,
  AiOutlineFileText,
  AiOutlineOrderedList,
} from 'react-icons/ai';
import { BiMicrophone } from 'react-icons/bi';
import { BsLink45Deg } from 'react-icons/bs';
import { CreatePostTabPanel } from './CreatePostTabPanel';
import { ImageVideoTabPanel } from './ImageVideoTabPanel';

interface CreatePostTabProps {}

export const CreatePostTab: React.FC<CreatePostTabProps> = ({}) => {
  const tabs = [
    { name: 'Post', icon: <AiOutlineFileText /> },
    { name: 'Images & Video', icon: <AiOutlineFileImage /> },
    { name: 'Link', icon: <BsLink45Deg /> },
    { name: 'Poll', icon: <AiOutlineOrderedList /> },
    { name: 'Talk', icon: <BiMicrophone /> },
  ];

  const renderTabs = () => {
    return tabs.map((tab) => (
      <Tab key={tab.name} paddingX={10} paddingY={3} _hover={{ bgColor: 'blue.50' }}>
        <Box fontSize={20} mr={1}>
          {tab.icon}
        </Box>
        {tab.name}
      </Tab>
    ));
  };

  return (
    <Tabs bg='white' borderRadius='md' maxW='79%'>
      <TabList fontWeight='bold'>{renderTabs()}</TabList>
      <TabPanels>
        <TabPanel>
          <CreatePostTabPanel />
        </TabPanel>

        <TabPanel>
          <ImageVideoTabPanel />
        </TabPanel>

        <TabPanel>
          <p>three!</p>
        </TabPanel>

        <TabPanel>
          <p>four!</p>
        </TabPanel>

        <TabPanel>
          <p>five!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
