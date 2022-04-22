import React, { FC, ReactSVG } from 'react';
import { ReactComponent as PermissionSVG } from '../../assets/images/permission.svg';
import { Text } from '../Permission/Permission-parts';
import { Heading, IKeySpacingMap, Stack, Container, Center } from '../common/Tags';

interface ISomethingWrongProps {
  heading?: string;
  text?: string;
  svg?: ReactSVG;
}

const SomethingWrong: FC<ISomethingWrongProps> = ({ heading, text, svg = <PermissionSVG /> }) => {
  return (
    <Container as={Center} height={'400px'}>
      <Stack>
        <Stack gutter={IKeySpacingMap.lg} align={'center'} justify={'center'}>
          {svg}
        </Stack>
        <Stack gutter={IKeySpacingMap.sm} align={'center'} justify={'center'}>
          {heading && (
            <Heading level={'h5'} size={'20'}>
              {heading}
            </Heading>
          )}
          {text && <Text>{text}</Text>}
        </Stack>
      </Stack>
    </Container>
  );
};

export default SomethingWrong;
