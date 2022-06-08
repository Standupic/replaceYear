import { Modal, Button } from 'juicyfront';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactComponent as JackdawSuccessSVG } from '../../../assets/images/jackdawSuccess.svg';
import { ReactComponent as CrossSVG } from '../../../assets/images/cross.svg';
import './styles.sass';
import { modalHandler, STATUS_APPLICATION } from '../../../store/globalStateSlice';
import { selectStatusApplication } from '../../../selectors/globalSelector';
import { KEY_SPACING } from '../../styledComponents/constants';
import { Center, Stack, Heading } from '../../styledComponents';
import { Text } from './Modal-parts';

const HeadingValues = {
  [STATUS_APPLICATION.Error]: 'Заявка не была исполнена',
  [STATUS_APPLICATION.Success]: 'Заявка успешно исполнена',
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
  const dispatch = useDispatch();
  const history = useHistory();
  const { push } = history;
  return (
    <>
      {statusApplication && (
        <Modal
          size="s"
          header
          onClose={() => {
            dispatch(modalHandler(push));
          }}>
          <Center as={Stack} gutter={KEY_SPACING.lg} centerChildren>
            {Images[statusApplication]}
            <Center as={Stack} centerChildren gutter={KEY_SPACING.sm}>
              <Heading size={'18px'} level={'h6'}>
                {HeadingValues[statusApplication]}
              </Heading>
              <Text isError={statusApplication === STATUS_APPLICATION.Error}>
                {TextValues[statusApplication]}
              </Text>
            </Center>
            <Button
              fullWidth
              onClick={() => {
                dispatch(modalHandler(push));
              }}>
              Продолжить
            </Button>
          </Center>
        </Modal>
      )}
    </>
  );
};

export default ModalContainer;
