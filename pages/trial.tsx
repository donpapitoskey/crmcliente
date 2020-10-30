import React from 'react';
import Layout from '../components/Layout';

interface Props {
  text: string;
  num: number;
  bool: boolean;
};

const Trial = ({text, num, bool}:Props) => {
  return <Layout >
          <h1>Desde trial</h1>
        </Layout>
  
};

Trial.defaultProps = {
  text: 'text',
  num: 1,
  bool: false,
}

export default Trial;