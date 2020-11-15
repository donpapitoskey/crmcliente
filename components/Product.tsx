/* eslint-disable no-underscore-dangle */
import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';

const ELIMINAR_PRODUCTO = gql`
  mutation eliminarProducto($id: ID!){
    eliminarProducto(id:$id)
  }
`;

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

const Client = ({ producto }:{producto:any}) => {
  const {
    id,
    nombre,
    existencia,
    precio,
  } = producto;
  const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO,{
    update(cache) {
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: obtenerProductos.filter((productoActual:any)=> productoActual.id !== id)
        },
      });
    },
  });

  const confirmDeleteProduct = () => {
    Swal.fire({
      title: 'Deseas eliminar a este producto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, cancelar!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await eliminarProducto({
            variables: {
              id,
            },
          });
          Swal.fire(
            'Correcto',
            data.eliminarProducto,
            'success',
          );
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

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
          onClick={() => confirmDeleteProduct()}
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
