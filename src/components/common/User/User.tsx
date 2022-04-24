import React from 'react';
import { Card, IKeySpacingMap, Inline, Box, Stack } from '../Tags';
import InlineCluster from '../../styledComponents/InlineCluster';
import { KEY_JUSTIFYING, KEY_SPACING } from '../../styledComponents/constants';

const User = () => {
  return (
    <Card>
      <InlineCluster gutter={KEY_SPACING.lg} align={KEY_JUSTIFYING.center}>
        <Box>img</Box>
        <Stack>
          <Box>Кузнецова Злата Игоревна</Box>
          <InlineCluster gutter={KEY_SPACING.lg} align={KEY_JUSTIFYING.center}>
            <Box>1.1 категория</Box>
            <Box>Начальник управления, вице-президент</Box>
          </InlineCluster>
        </Stack>
      </InlineCluster>
    </Card>
  );
};

export default User;
