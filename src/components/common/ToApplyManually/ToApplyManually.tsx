import React, { FC, useState } from 'react';
import { Button, Hint, InputFile } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { IFileData } from 'juicyfront/types';
import { Box, Card, Heading, Stack, Inline } from '../../styledComponents';
import { ReactComponent as DownLoadSVG } from '../../../assets/images/download.svg';
import getStatement, { IAttachment } from '../../../middlewares/getStatement';
import { selectPdfFileLoading } from '../../../selectors/globalSelector';
import { resetStatementAttachment } from '../../../store/globalStateSlice';

interface IProps {
  attachment?: IAttachment;
  attachmentId: string;
  toUpdateAttachment: (props: { base64: string; cert?: string; singBase64?: string }) => void;
}

const ToApplyManually: FC<IProps> = ({ attachmentId, attachment, toUpdateAttachment }) => {
  const dispatch = useDispatch();
  const [isAttachable, setAttachable] = useState(false);
  const pdfLoading = useSelector(selectPdfFileLoading);
  return (
    <>
      <Card>
        <Stack>
          <Heading level={'h6'} size={'16px'}>
            Заявление на замену лет для расчёта больничного
          </Heading>
          <Hint variant={'blue'} maxWidth={'100%'} title={'Заявление необходимо заполнить вручную'}>
            Так как период длительного отсутствия был у другого работодателя, необходимо скачать
            бланк заявления и заполнить его вручную. В заявлении требуется указать период нахождения
            в отпуске по уходу за ребёнком/БИР. Далее необходимо подписать заявление, прикрепить его
            скан и нажать кнопку «Отправить». В случае возникновения вопросов вы можете написать на
            почту <a href="mailto:rszp_iks@vtb.ru">rszp_iks@vtb.ru</a>.
          </Hint>
          <Box>
            <Inline stretch={0}>
              <Box>
                <InputFile
                  buttonType="light"
                  disabled={isAttachable || !attachment}
                  fullWidth={false}
                  name={'file'}
                  placeholder={'Прикрепить файл'}
                  setFile={(file: IFileData[]) => {
                    if (!file.length) {
                      setAttachable(false);
                      dispatch(resetStatementAttachment());
                    } else {
                      toUpdateAttachment({ base64: file[0].base64 });
                      setAttachable(!isAttachable);
                    }
                  }}
                />
              </Box>
              <Button
                buttonType={'outline'}
                preloader={pdfLoading}
                onClick={() => dispatch(getStatement(attachmentId))}
                startAdornment={<DownLoadSVG />}>
                Шаблон заявления
              </Button>
            </Inline>
          </Box>
        </Stack>
      </Card>
    </>
  );
};

export default ToApplyManually;
