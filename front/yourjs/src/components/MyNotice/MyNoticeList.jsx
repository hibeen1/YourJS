import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../../common/customAxios';
import { apis } from '../../common/apis';
import { colors } from '../../common/color';
import plusbutton from '../../img/plusbutton3.png';
import { progressList } from '../../common/define';

// 아이템 리스트
const ItemList = styled.div`
  width: 240px;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  color: black;
  border: 1px solid ${colors.bsColor1};
  border-radius: 10px;
  background-color: #FBFBFD;
  margin-top: 30px;
  cursor: pointer;
  &:hover {
    box-shadow: 0.05rem 0.05rem 0.25rem 0.25rem ${colors.bsColor1};
  }
  .progress {
    color: ${colors.bsColor3};
    /* color: #0078FF; */
    justify-content: flex-end;
    padding-top: 15px;
    font-size: 16px;
    font-weight: 900;
    text-align: end;
  }
  .coName {
  }
  .noticeName {
  }
  .tag {
  }
  .regdate {
    justify-content: center;
    padding-left: 25%;
    padding-top: 3%;
  }
`;

const NoItemDiv = styled.div`
  flex-direction: column;
  width: 100%;
  height: 500px;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.5);
`;

const Add = styled.button`
width:250px;
height:80px;
font-size: 40px;
border-radius: 15px;
border : 2px solid ${colors.bsColor3};
background-color: ${colors.bsColor3};

color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  :hover{
    background-color: ${colors.bsColor4};
    color: rgba(0, 0, 0, 0.8);
  }


`

// 태그를 담을 div box
const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 70px;
  column-gap: 10px;
  row-gap: 6px;

  padding: 0px 20px 0px 20px;
`;
// 태그 하나하나의 div
const TagItemBox = styled.div`
  width: fit-content;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 8px 0px 8px;
  font-size: 15px;
  border-radius: 10px;
  background-color: white;
  border: 2px solid ${colors.bsColor1};
`;

const SearchAlignDiv = styled.div``;

//검색 input

const SearchInput = styled.input`
  width: 500px;
  height: 40px;
  border: 2px solid ${colors.bsColor2};
  border-radius: 20px;
  padding-left: 10px;

  :focus {
    outline: auto;
    outline-color: ${colors.bsColor3};
  }
  /* ::-webkit-input-placeholder{text-align:center} */
`;

const SearchButton = styled.div`
  position: absolute;
  top: 12px;
  right: 20px;
  cursor: pointer;
`;

const Label = styled.label`
  position: relative;
`;

// 아이템 나누기
const ItemGrid = styled.div`
  font-weight: 600;
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  justify-content: center;
  text-align: center;

  margin-left: ${props => props.marginLeft};
  margin-top: ${props => props.marginTop};
  font-size: 20px;
  background-color: ${props => props.backgrounColor};
`;

const ItemGrid2 = styled.div`
  width: 100px;
  height: 200px;
  display: flex;
  justify-content: center;
`;

// 전체 영역 , pages에 60% 걸어둠
const Wrapper = styled.div`
  width: 100%;
`;
// 카드 여러개 map 해주는 style div
const ListTotal = styled.div`
  height: 100%;
  display: flex;
  margin-bottom: 10%;
  row-gap: 80px;
  column-gap: 47px;
  flex-wrap: wrap;
`;
//셀렉트
const ProgressSelect = styled.select`
  border-radius: 10px;
  margin-left: 10px;
  border: 2px solid ${colors.bsColor2};
  width: 250px;
  height: 40px;
  text-align: center;
  outline-color: ${colors.bsColor2};
  font-size: 18px;
`;

// 자소서 작성 버튼
const CreateButton = styled.div`
  border-radius: 10px;
  box-shadow: 0.1rem 0.1rem 0.1rem ${colors.bsColor4};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  background-color: ${colors.bsColor3};
  border-radius: 5px;
  font-size: 18px;
  color: ${colors.bsColor1};

  :hover {
    background-color: ${colors.bsColor2};
    box-shadow: 0.2rem 0.2rem 0.2rem ${colors.bsColor3};
  }
`;

const ButtonImg3 = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  position: fixed;
  left: 88%;
  top: 83%;
`;

ButtonImg3.defaultProps = {
  src: plusbutton,
};


//테스트 버튼
const TestButton = styled.button`
  position: fixed;
  left: 82%;
  top: 65%;

  width: 300px;
  height: 300px;
  background-color: red;
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 0px;
  width: 50px;
  height: 30px;
  font-size: 15px;
  font-weight: 600;
  color: red;
  border: none;
  background-color: #FBFBFD;
  cursor: pointer;
`;

const MyNoticeList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchData, setSearchData] = useState('');
  const [getState, setGetState] = useState(location?.state?.type);
  const [dropdownState, setDropdownState] = useState(getState ? getState : '0');
  const [dummyData, setDummyData] = useState([]);
  const [visible,setVisible] =useState('0');

  useEffect(() => {
    getNoticeData();
  }, [dropdownState]);

  // axios get 하는 함수
  const getNoticeData = () => {
    axiosInstance
      .get(apis.notice)
      .then(response => {
        if (response.data.length === 0) {
          setVisible('1')
        }
        
        if (Number(dropdownState) === 0) {
          const data = response.data;
          
          setDummyData(data);
          
          
        } else {
          const data = response.data.filter(
            data => data.progress === progressList[Number(dropdownState) - 1],
          );
          setDummyData(data);
        }
      })
      .catch(error => console.log(error));
  };

  const handleDropdownState = e => {
    setDropdownState(e.target.value);
  };

  // 검색 함수

  const handleChangeSearch = e => {
    getNoticeData();
    setSearchData(e.target.value);
  };

  // 검색 엔터 함수
  const keyDownSearch = e => {
    if (e.key === 'Enter') {
      handleSearch(searchData);

      setSearchData('');
    }
  };

  // 검색 버튼 클릭 함수

  const onClickSearch = () => {
    handleSearch(searchData);
    setSearchData('');
  };

  const handleSearch = search => {
    let searchForm = [];
    dummyData.forEach((dummy, index) =>
      dummy.noticeTag.indexOf(search) !== -1 ? searchForm.push(dummy) : search,
    );

    setDummyData(searchForm);
  };

  return (
    <Wrapper>
      <br></br>
      <br></br>

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <ProgressSelect
          id="contentFont"
          defaultValue={getState ? getState : 0}
          onChange={handleDropdownState}
        >
          <option value="0">전체보기</option>
          <option value="1">등록</option>
          <option value="2">진행중</option>
          <option value="3">서류탈락</option>
          <option value="4">코딩테스트탈락</option>
          <option value="5">면접탈락</option>
          <option value="6">최종합격</option>
        </ProgressSelect>
        <Label>
          <SearchInput
            onChange={handleChangeSearch}
            value={searchData}
            onKeyDown={keyDownSearch}
            placeholder="태그를 검색하세요."
          ></SearchInput>
          <SearchButton className="searchbutton" onClick={onClickSearch}>
            🔍
          </SearchButton>
        </Label>

        <ProgressSelect style={{ visibility: 'hidden' }}></ProgressSelect>
      </div>
      <br></br>
      <br></br>

      <ListTotal>
          {visible === '1' ? <NoItemDiv id="contentFont">
            <div style={{marginBottom:"30px"}}>등록된 공고가 없습니다.</div>
            
            <Link to="/notice/add" style={{ textDecoration: 'none' }}>
            <Add id="contentFont">등록하기</Add>
            
            </Link>
          </NoItemDiv> : <div style={{display:"none"}}></div> }
          
        
          {dummyData?.map((dummy, index) => (
            <ItemList
              key={index}
              onClick={() => {
                navigate('/notice/detail', {
                  state: {
                    noticeSeq: dummy.noticeSeq,
                  },
                });
              }}
            >
              <ItemGrid className="progress" id="titleFont" width="100%">
                {dummy.progress}
                <div style={{ width: '10px' }}></div>
              </ItemGrid>
              <ItemGrid
                className="coName"
                id="contentFont"
                width="250px"
                marginTop="40px"
              >
                {dummy.coName.length >= 20
                  ? dummy.coName.substr(0, 20) + '...'
                  : dummy.coName}
              </ItemGrid>
  
              <ItemGrid
                className="noticeName"
                id="contentFont"
                width="250px"
                marginTop="20px"
              >
                {dummy.noticeName.length >= 20
                  ? dummy.noticeName.substr(0, 20) + '...'
                  : dummy.noticeName}
              </ItemGrid>
              <br></br>
              <TagBox>
                {dummy?.noticeTag?.split(', ').map((tag, index) =>
                  tag === '' ? (
                    <div key={index}></div>
                  ) : (
                    <TagItemBox className="tag" id="contentFont" key={index}>
                      # {tag.length >= 8 ? tag.substr(0, 8) + '...' : tag}
                    </TagItemBox>
                  ),
                )}
              </TagBox>
              <br></br>
  
              <br></br>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <DeleteButton
                  id="titleFont"
                  onClick={e => {
                    e.stopPropagation();
                    if (window.confirm('정말로 삭제하시겠습니까 ?')) {
                      axiosInstance
                        .delete(apis.notice, {
                          data: { noticeSeq: dummy.noticeSeq },
                        })
                        .then(response => getNoticeData())
                        .catch(error => console.log(error));
                    } else {
                      return;
                    }
                  }}
                >
                  삭제
                </DeleteButton>
              </div>
            </ItemList>
          ))}
        
        
      </ListTotal>
      <Link to="/notice/add" style={{ textDecoration: 'none' }}>
        {/* <ButtonImg><ButtonImg2>➕</ButtonImg2>
      <FontAwesomeIcon size='4x' icon={faCirclePlus}></FontAwesomeIcon>

      </ButtonImg> */}
        <ButtonImg3></ButtonImg3>
      </Link>
    </Wrapper>
  );
};

export default MyNoticeList;
