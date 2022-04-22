import { Modal, Button } from 'juicyfront';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as JackdawSuccessSVG } from '../../../assets/images/jackdawSuccess.svg';
import { ReactComponent as CrossSVG } from '../../../assets/images/cross.svg';
import './styles.sass';
import { STATUS_APPLICATION } from '../../../store/globalStateSlice';
import { selectStatusApplication } from '../../../selectors/globalSelector';
import { Heading, IKeySpacingMap, Stack } from '../Tags';
import { Text } from './Modal-parts';

const HeadingValues = {
  [STATUS_APPLICATION.Error]: 'Заявка успешно исполнена',
  [STATUS_APPLICATION.Success]: 'Заявка не была исполнена',
};

const TextValues = {
  [STATUS_APPLICATION.Error]:
    'Табельный номер был блокирован пользователем Ивановым Иваном. Попробуйте создать заявку позже.',
  [STATUS_APPLICATION.Success]: 'Созданные заявки будут отображаться в раздел «Мои заявки»',
};

const Images = {
  [STATUS_APPLICATION.Error]: <CrossSVG />,
  [STATUS_APPLICATION.Success]: <JackdawSuccessSVG />,
};

const ModalContainer: FC = () => {
  const statusApplication = useSelector(selectStatusApplication);
  return (
    <>
      {statusApplication && (
        <Modal size="s" header>
          <Stack gutter={IKeySpacingMap.xl} align={'center'} justify={'center'}>
            {Images[statusApplication]}
            <Stack gutter={IKeySpacingMap.sm} align={'center'} justify={'center'}>
              <Heading size={'18px'} level={'h6'}>
                {HeadingValues[statusApplication]}
              </Heading>
              <Text isError={statusApplication === STATUS_APPLICATION.Error}>
                {TextValues[statusApplication]}
              </Text>
            </Stack>
            <Button fullWidth>Продолжить</Button>
          </Stack>
        </Modal>
      )}
    </>
  );
};

export default ModalContainer;
