import React from 'react';
import { useState } from 'react';
import {Content, LeftBox, LeftBoxTitle, LeftBoxContent, CenterBox, RightBoxes, RightBox, RightBoxTitle,
  BoxInput, BoxArea, SaveButton, Essential, EssentialDate, DateBox} from '../../common/PorfoStyled';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { addDays } from 'date-fns/esm';
import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import range from "lodash/range"


const AwardEditComponent = ({getServerData}) => {
  const years = range(getYear(new Date()), getYear(new Date())-40, -1);
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const [awardName, setawardName] = useState('');
  const [winDate, setwinDate] = useState('');
  const [awardContents, setawardContents] = useState('');
  const [awardInstitution, setawardInstitution] = useState('');
  const [data, setData] = useState({awardName: '', winDate: '', awardContents: '', awardInstitution: ''});

  const onChangeNameHandler = e => {
    setawardName(e.target.value);
    setData({ ...data, awardName: awardName });
  };

  const onChangeawardContentsHandler = e => {
    setawardContents(e.target.value);
    setData({ ...data, awardContents: awardContents });
  };

  const onChangeawardInstitutionHandler = e => {
    setawardInstitution(e.target.value);
    setData({ ...data, awardInstitution: awardInstitution });
  };

  const addButtonClicked = () => {
    const data = {
      awardName: awardName === "" ? null : awardName,
      winDate: winDate === "" ? null : addDays(winDate, 1),
      awardContents: awardContents === "" ? null : awardContents,
      awardInstitution: awardInstitution === "" ? null : awardInstitution,
    }

    if (data.awardName === null || data.winDate === null || data.awardContents === null || data.awardInstitution === null) {
      alert("???????????? ????????? ?????????.")
    } else {
    axiosInstance
      .post(apis.award, data)
      .then(response => {
        if (response.status === 200) {
          getServerData()
          setawardName('')
          setwinDate('')
          setawardContents('')
          setawardInstitution('')
        }
      })
      .catch(error => console.log(error));}
  };

  return (
    <Content>
      <LeftBox style={{marginLeft: "2rem"}}>
        <br/>
        <LeftBoxTitle>?????????<EssentialDate>(*)</EssentialDate></LeftBoxTitle>
        <LeftBoxContent>
        <DatePicker
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
            }) => (
              <Content>
                <DateBox>
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(Number(value))}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span> ???</span>
                </DateBox>
                <DateBox>
                  <select
                    value={months[getMonth(date)]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span> ???</span>
                </DateBox>
              </Content>
            )}
            locale={ko}
            placeholderText='?????????'
            dateFormat="yyyy - MM - dd"
            autoComplete="off"
            id="contentFont"
            selected={winDate}
            onChange={date => setwinDate(date)}
          /></LeftBoxContent>
        <br/><br/>
        <SaveButton
          onClick={addButtonClicked}
        >??????</SaveButton>
      </LeftBox>
      <CenterBox></CenterBox>
      <RightBoxes>
        <RightBox>
          <RightBoxTitle>????????? <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={awardName}
            onChange={onChangeNameHandler}
            placeholder='???????????? ????????? ?????????'
          ></BoxInput>
        </RightBox>
        <RightBox>
          <RightBoxTitle>???????????? <Essential>(*)</Essential></RightBoxTitle>
          <BoxArea 
            value={awardContents}
            onChange={onChangeawardContentsHandler}
            placeholder='??????????????? ????????? ?????????'
          ></BoxArea>
        </RightBox>
        <RightBox>
          <RightBoxTitle>???????????? <Essential>(*)</Essential></RightBoxTitle>
          <BoxInput 
            value={awardInstitution}
            onChange={onChangeawardInstitutionHandler}
            placeholder='??????????????? ????????? ?????????'
          ></BoxInput>
        </RightBox>
      </RightBoxes>
    </Content>
  )
}


export default AwardEditComponent;