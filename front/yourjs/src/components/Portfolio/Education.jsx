//κ΅μ‘μ¬ν­
import React, {useState, useEffect} from 'react';
import {Container, ContentTitle, ContentSet, Content, LeftBox, CenterBox, RightBoxes, RightBox, RightBoxTitle, RightBoxContent, Hr, NoData} from '../../common/PorfoStyled';
import { apis } from '../../common/apis';
import axiosInstance from '../../common/customAxios';


const Education = () => {
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(apis.education)
      .then(response => {
        setViewData(response.data);
      })
  }, []);

  return (
    <Container id='4'>
      <ContentTitle>π₯ κ΅μ‘μ¬ν­</ContentTitle>
      <ContentSet>
        <Hr></Hr>
        {viewData.length ? 
          <div>
            {viewData?.map((el, index) => (
              <Content key={index}>
                <LeftBox>{el.startDate}<br/>~ {el.endDate}</LeftBox>
                <CenterBox></CenterBox>
                <RightBoxes>
                  <RightBox>
                    <RightBoxTitle>κ΅μ‘λͺ</RightBoxTitle>
                    <RightBoxContent>{el.eduName}</RightBoxContent>
                  </RightBox>
                  <RightBox>
                    <RightBoxTitle>μ£Όκ΄κΈ°κ΄</RightBoxTitle>
                    <RightBoxContent>{el.eduInstitution}</RightBoxContent>
                  </RightBox>
                  <RightBox>
                    <RightBoxTitle>κ΅μ‘μκ°</RightBoxTitle>
                    <RightBoxContent>{el.eduTime} μκ°</RightBoxContent>
                  </RightBox>
                  <RightBox>
                    <RightBoxTitle>κ΅μ‘λ΄μ©</RightBoxTitle>
                    <RightBoxContent>{el.eduContents?.split("\n").map((e, index) => <div key={index}>{e}</div>)}</RightBoxContent>
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

export default Education;
