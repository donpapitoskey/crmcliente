/* eslint-disable no-underscore-dangle */
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import Client from '../components/Client';

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor{
      _id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const IndexPage = () => {
  const router = useRouter();

  const { data, loading, error} = useQuery(OBTENER_CLIENTES_USUARIO);
  console.log('data Frot table \n', data);

  if (loading) return 'Cargando ...';

  if (!data.obtenerClientesVendedor) {
    return router.push('/login');
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
        <Link href="/newclient">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold" href="/newclient">
            Nuevo Cliente
          </a>
        </Link>
        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Eliminar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.obtenerClientesVendedor.map((cliente:any) => (
              <Client
                key={cliente._id}
                cliente={cliente}
              />
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  );
};

export default IndexPage;
