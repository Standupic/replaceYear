import React, { FC, ReactSVG } from 'react';
import { ReactComponent as PermissionSVG } from '../../assets/images/permission.svg';
import { Text } from '../Permission/Permission-parts';
import { Cover, Center, Box, Stack, Heading } from '../styledComponents';
import { KEY_SPACING } from '../styledComponents/constants';

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
        <Stack gutter={KEY_SPACING.sm}>
          {heading && (
            <Heading level={'h5'} size={'20px'}>
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
