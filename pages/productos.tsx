/* eslint-disable no-underscore-dangle */
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Product from '../components/Product';
import Layout from '../components/Layout';

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos{
    obtenerProductos {
      _id
      nombre
      precio
      existencia
      creado
    }
  }
`;

const Productos = () => {
  const { data, loading } = useQuery(OBTENER_PRODUCTOS);
  if (loading) return 'Cargando ...';
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Existencia</th>
              <th className="w-1/5 py-2">Precio</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerProductos.map((producto:any) => (
              <Product
                key={producto._id}
                producto={producto}
              />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default Productos;
