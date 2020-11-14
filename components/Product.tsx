/* eslint-disable no-underscore-dangle */
import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';

// const ELIMINAR_CLIENTE = gql`
//   mutation eliminarCliente($id:ID!) {
//     eliminarCliente(id:$id)
//   }
// `;

// const OBTENER_CLIENTES_USUARIO = gql`
//   query obtenerClientesVendedor {
//     obtenerClientesVendedor{
//       _id
//       nombre
//       apellido
//       empresa
//       email
//     }
//   }
// `;

const Client = ({ producto }:{producto:any}) => {
  const {
    _id,
    nombre,
    existencia,
    precio,
  } = producto;

  // const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
  //   update(cache) {
  //     const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });
  //     cache.writeQuery({
  //       query: OBTENER_CLIENTES_USUARIO,
  //       data: {
  //         obtenerClientesVendedor: obtenerClientesVendedor
  //           .filter((element:any) => element._id !== _id),
  //       },
  //     });
  //   },
  // });

  // const confirmDeleteClient = (id:any) => {
  //   Swal.fire({
  //     title: 'Deseas eliminar a este cliente?',
  //     text: 'Esta acción no se puede deshacer.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si, Eliminar!',
  //     cancelButtonText: 'No, cancelar!',
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const { data } = await eliminarCliente({
  //           variables: {
  //             id,
  //           },
  //         });
  //         Swal.fire(
  //           'Eliminado!',
  //           data.eliminarCliente,
  //           'success',
  //         );
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   });
  // };

  // const editClient = (id:any) => {
  //   Router.push({
  //     pathname: '/editarCliente/[id]',
  //     query: { id },
  //   });
  // };

  return (
    <tr>
      <td className="border px-4 py-2">
        {nombre}
      </td>
      <td className="border px-4 py-2">
        {existencia}
      </td>
      <td className="border px-4 py-2">
        {precio}
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold "
          // onClick={() => confirmDeleteClient(_id)}
        >
          Eliminar
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold "
          // onClick={() => editClient(_id)}
        >
          Editar
        </button>
      </td>
    </tr>
  );
};

export default Client;
