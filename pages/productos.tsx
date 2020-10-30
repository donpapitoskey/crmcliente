import React from 'react';
import Layout from '../components/Layout';

interface Props {
  text: string;
  num: number;
  bool: boolean;
};

const Productos = ({text, num, bool}:Props) =>(
  <div>
    <Layout >
      <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
    </Layout>
  </div> 
);

Productos.defaultProps = {
  text: 'text',
  num: 1,
  bool: false,
}

export default Productos;