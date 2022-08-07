import { Breadcrumb } from 'antd';
import React from 'react';
import { HomeOutlined } from '@ant-design/icons';

const NavBar = () => {

  return (
    <Breadcrumb style={{ margin: '3%' }}>
      <Breadcrumb.Item href="/">
        <HomeOutlined />
      </Breadcrumb.Item>
    
      <Breadcrumb.Item href="/cart">Carrello</Breadcrumb.Item>
    </Breadcrumb>
  );
};



export default NavBar;