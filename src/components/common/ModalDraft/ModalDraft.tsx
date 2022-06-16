import { Modal, Button } from 'juicyfront';
import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactComponent as JackdawSuccessSVG } from '../../../assets/images/jackdawSuccess.svg';
import { ReactComponent as CrossSVG } from '../../../assets/images/cross.svg';
import '../Modal/styles.sass';
import { KEY_SPACING } from '../../styledComponents/constants';
import { Center, Stack, Heading } from '../../styledComponents';
import { RootState } from '../../../store';
import {
  setStatusDraftApplication,
  STATUS_DRAFT_APPLICATION,
} from '../../../store/applicationsSlice';
import { Text } from '../Modal/Modal-parts';

const HeadingValues = {
  [STATUS_DRAFT_APPLICATION.Error]: 'Черновик не был удален',
  [STATUS_DRAFT_APPLICATION.Success]: 'Черновик успешно удален',
};

const TextValues = {
  [STATUS_DRAFT_APPLICATION.Error]: 'Произошла техническая ошибка',
  [STATUS_DRAFT_APPLICATION.Success]: 'Вы можете создать новую заявку',
};

const Images = {
  [STATUS_DRAFT_APPLICATION.Error]: <CrossSVG />,
  [STATUS_DRAFT_APPLICATION.Success]: <JackdawSuccessSVG />,
};

const ModalDraft: FC = () => {
  const { statusDraftApplication } = useSelector((state: RootState) => state.applications);
  const dispatch = useDispatch();
  const history = useHistory();
  const onClickHandler = () => {
    if (statusDraftApplication === STATUS_DRAFT_APPLICATION.Success) {
      history.goBack();
    }
    dispatch(setStatusDraftApplication(undefined));
  };
  return (
    <>
      {statusDraftApplication && (
        <Modal size="s" header onClose={onClickHandler}>
          <Center as={Stack} gutter={KEY_SPACING.lg} centerChildren>
            {Images[statusDraftApplication]}
            <Center as={Stack} centerChildren gutter={KEY_SPACING.sm}>
              <Heading size={'18px'} level={'h6'}>
                {HeadingValues[statusDraftApplication]}
              </Heading>
              <Text isError={statusDraftApplication === STATUS_DRAFT_APPLICATION.Error}>
                {TextValues[statusDraftApplication]}
              </Text>
            </Center>
            <Button fullWidth onClick={onClickHandler}>
              Продолжить
            </Button>
          </Center>
        </Modal>
      )}
    </>
  );
};

export default ModalDraft;
