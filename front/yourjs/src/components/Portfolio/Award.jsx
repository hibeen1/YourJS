//μμλ΄μ­
import React, {useState, useEffect} from 'react';
import {Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr, NoData} from '../../common/PorfoStyled';
import { apis } from '../../common/apis';
import axiosInstance from '../../common/customAxios';


const Award = () => {
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(apis.award)
      .then(response => {
        setViewData(response.data);
      })
  }, []);

  return (
    <Container id='6'>
      <ContentTitle>π₯ μμλ΄μ­</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        {viewData.length ? 
          <div>
            {viewData?.map((el, index) => (
              <Content key={index}>
                <LeftBox>{el.winDate}</LeftBox>
                <CenterBox></CenterBox>
                <RightBoxes>
                  <RightBox>
                    <RightBoxTitle>μμλͺ</RightBoxTitle>
                    <RightBoxContent>{el.awardName}</RightBoxContent>
                  </RightBox>
                  <RightBox>
                    <RightBoxTitle>μμλ΄μ©</RightBoxTitle>
                    <RightBoxContent>{el.awardContents?.split("\n").map((e, index) => <div key={index}>{e}</div>)}</RightBoxContent>
                  </RightBox>
                  <RightBox>
                    <RightBoxTitle>μμκΈ°κ΄</RightBoxTitle>
                    <RightBoxContent>{el.awardInstitution}</RightBoxContent>
                  </RightBox>
                </RightBoxes>
              </Content>
            ))}
          </div> : 
          <NoData>λ±λ‘λ μ λ³΄κ° μμ΅λλ€.</NoData>
        }
      </ContentSet>
    </Container>
  )
};


export default Award;