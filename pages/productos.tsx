/* eslint-disable no-underscore-dangle */
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import Product from '../components/Product';
import Layout from '../components/Layout';

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos{
    obtenerProductos {
      id
      nombre
      precio
      existencia
      creado
    }
  }
`;

const Productos = () => {
  const { data, loading } = useQuery(OBTENER_PRODUCTOS);
  console.log(data);
  if (loading) return 'Cargando ...';
  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Productos</h1>
        <Link href="/newproduct">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold" href="/newcproduct">
            Nuevo Producto
          </a>
        </Link>
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
                key={producto.id}
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
