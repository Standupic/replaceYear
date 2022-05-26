import React, {useState} from 'react';
import { Button, Hint, InputFile } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, Heading, InlineCluster, Stack, Inline } from '../../styledComponents';
import { ReactComponent as DownLoadSVG } from '../../../assets/images/download.svg';
import getStatement from '../../../middlewares/getStatement';
import { selectAttachmentId, selectPdfFileLoading } from '../../../selectors/globalSelector';

const ToApplyManually = () => {
  const dispatch = useDispatch();
  const attachmentId = useSelector(selectAttachmentId);
  const pdfLoading = useSelector(selectPdfFileLoading);
  const [isAttachable, setAttachable] = useState(false);
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
            <Inline index={'0'}>
              <Box>
                <InputFile
                  buttonType="light"
                  disabled={isAttachable}
                  fullWidth={false}
                  name={'file'}
                  placeholder={'Прикрепить файл'}
                  setFile={() => {
                    setAttachable(!isAttachable);
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
