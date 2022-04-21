import React, { FC, ReactSVG } from 'react';
import Stack, { IKeySpacingMap } from '../common/Stack';
import { ReactComponent as PermissionSVG } from '../../assets/images/permission.svg';
import { Heading, Text } from '../Permission/Permission-parts';

interface ISomethingWrongProps {
  heading?: string;
  text?: string;
  svg: ReactSVG;
}

const SomethingWrong: FC<ISomethingWrongProps> = ({ heading, text, svg = <PermissionSVG /> }) => {
  return (
    <>
      <Stack>{svg}</Stack>
      <Stack gutter={IKeySpacingMap.sm}>
        {heading && <Heading>{heading}</Heading>}
        {text && <Text>{text}</Text>}
      </Stack>
    </>
  );
};

export default SomethingWrong;
