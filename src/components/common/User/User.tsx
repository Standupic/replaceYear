import React from 'react';
import { Card, IKeySpacingMap, Inline, Box, Stack } from '../Tags';

const User = () => {
  return (
    <Card>
      <Inline gutter={IKeySpacingMap.sm}>
        <Box>img</Box>
        <Stack>
          <Box>Кузнецова Злата Игоревна</Box>
          <Inline gutter={IKeySpacingMap.sm}>
            <Box>1.1 категория</Box>
            <Box>Начальник управления, вице-президент</Box>
          </Inline>
        </Stack>
      </Inline>
    </Card>
  );
};

export default User;
