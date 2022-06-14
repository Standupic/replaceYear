import React from 'react';
import { Datepicker, Input } from 'juicyfront';
import { AllSearch } from 'juicyfront/indexIcon';
import { useDispatch } from 'react-redux';
import { Card, Inline, Box } from '../../styledComponents';
import { KEY_JUSTIFYING } from '../../styledComponents/constants';
import searchingApplications from '../../../middlewares/searchingApplications';
import receiveApplications from '../../../middlewares/receiveApplications';

const Filters = () => {
  const dispatch = useDispatch();
  return (
    <Card>
      <Inline stretch={1}>
        <Box>
          <Datepicker
            range
            placeholder={'Выберите период'}
            onChange={(value) => {
              console.log(value);
            }}
          />
        </Box>
        <Inline justify={KEY_JUSTIFYING.end}>
          <Box width={'280px'}>
            <Input
              startAdornment={<AllSearch />}
              placeholder={'ID, ФИО, TH'}
              onDebounce={(result) => {
                if (!result.debounceString) {
                  dispatch(receiveApplications({}));
                } else {
                  dispatch(searchingApplications(result.debounceString));
                }
              }}
            />
          </Box>
        </Inline>
      </Inline>
    </Card>
  );
};

export default Filters;
