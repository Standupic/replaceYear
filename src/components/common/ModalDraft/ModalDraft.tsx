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
import { STATUS_DRAFT_APPLICATION } from '../../../store/applicationsSlice';
import { Text } from '../Modal/Modal-parts';
import { setDraftStatus } from '../../../store/draftSlice';

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
  const { statusDraft } = useSelector((state: RootState) => state.draft);
  const dispatch = useDispatch();
  const history = useHistory();
  const onClickHandler = () => {
    if (statusDraft === STATUS_DRAFT_APPLICATION.Success) {
      history.goBack();
    }
    dispatch(setDraftStatus(undefined));
  };
  return (
    <>
      {statusDraft && (
        <Modal size="s" header onClose={onClickHandler}>
          <Center as={Stack} gutter={KEY_SPACING.lg} centerChildren>
            {Images[statusDraft]}
            <Center as={Stack} centerChildren gutter={KEY_SPACING.sm}>
              <Heading size={'18px'} level={'h6'}>
                {HeadingValues[statusDraft]}
              </Heading>
              <Text isError={statusDraft === STATUS_DRAFT_APPLICATION.Error}>
                {TextValues[statusDraft]}
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
