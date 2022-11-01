import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  min-height: 100vh;
  height: fit-content;
  padding: 0;
  margin: 0;
`;

const Layout = () => {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        height: 'fit-content',
        padding: 0,
        margin: 0,
      }}
    >
      <div style={{ width: '100%', height: '108px' }}>
        <Header></Header>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Layout;