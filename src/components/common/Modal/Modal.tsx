import { Modal, Button } from 'juicyfront';
import React, { FC, useState } from 'react';
import { ReactComponent as JackdawSuccess } from '../../../assets/images/jackdawSuccess.svg';
import { ReactComponent as Cross } from '../../../assets/images/cross.svg';
import './styles.sass';
import Stack, { IKeySpacingMap } from '../Stack';
import { Text, Heading } from './Modal-parts';

export enum IModalStatus {
  Error = 'Error',
  Success = 'Success',
}

const HeadingValues = {
  [IModalStatus.Error]: 'Заявка успешно исполнена',
  [IModalStatus.Success]: 'Заявка не была исполнена',
};

const TextValues = {
  [IModalStatus.Error]:
    'Табельный номер был блокирован пользователем Ивановым Иваном. Попробуйте создать заявку позже.',
  [IModalStatus.Success]: 'Созданные заявки будут отображаться в раздел «Мои заявки»',
};

const Images = {
  [IModalStatus.Error]: <Cross />,
  [IModalStatus.Success]: <JackdawSuccess />,
};

const ModalContainer: FC = () => {
  const [isError] = useState<null | IModalStatus>(null); // in store
  return (
    <>
      {isError && (
        <Modal size="s" header>
          <Stack gutter={IKeySpacingMap.xl}>
            {Images[isError]}
            <Stack gutter={IKeySpacingMap.sm}>
              <Heading>{HeadingValues[isError]}</Heading>
              <Text isError={isError === IModalStatus.Error}>{TextValues[isError]}</Text>
            </Stack>
            <Button fullWidth>Продолжить</Button>
          </Stack>
        </Modal>
      )}
    </>
  );
};

export default ModalContainer;
