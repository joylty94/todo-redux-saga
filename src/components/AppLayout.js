import React, {memo} from 'react';
import { useSelector} from 'react-redux';
import styled from 'styled-components';
import { Spin , Alert} from 'antd';

const Layout = styled.div`
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    padding-top: 50px;
`

const AppLayout = memo(({ children }) => {
    const loading = useSelector(state => state.todo.loading)

    return (
        <Layout>
            {
                loading 
                    ? <Spin tip="Loading..." style={{width: '100%', height:'100%',}}></Spin>
                    : children
            }
        </Layout>
    );
})

export default AppLayout;