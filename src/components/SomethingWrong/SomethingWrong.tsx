import React, { FC, ReactSVG } from 'react';
import { ReactComponent as PermissionSVG } from '../../assets/images/permission.svg';
import { Text } from '../Permission/Permission-parts';
import { Heading } from '../common/Tags';
import Cover from '../styledComponents/Cover';
import Center from '../styledComponents/Center';
import { KEY_SPACING } from '../styledComponents/constants';
import Box from '../styledComponents/Box';
import Stack from '../styledComponents/Stack';

interface ISomethingWrongProps {
  heading?: string;
  text?: string;
  svg?: ReactSVG;
}

const SomethingWrong: FC<ISomethingWrongProps> = ({ heading, text, svg = <PermissionSVG /> }) => {
  return (
    <Cover heightTop="236px">
      <Center as={Stack} gutter={KEY_SPACING.lg} centerChildren centerText>
        <Box>{svg}</Box>
        <Stack gutter={KEY_SPACING.xs}>
          {heading && (
            <Heading level={'h5'} size={'20'}>
              {heading}
            </Heading>
          )}
          {text && <Text>{text}</Text>}
        </Stack>
      </Center>
    </Cover>
  );
};

export default SomethingWrong;
