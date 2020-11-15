/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import Layout from '../components/Layout';

const NUEVO_PRODUCTO = gql`
  mutation nuevoProducto($input: ProductoInput){
    nuevoProducto(input: $input){
      id
      nombre
      existencia
      precio
      creado
    }
  }
`;

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos{
    obtenerProductos {
      nombre
      precio
      existencia
      creado
    }
  }
`;

const NuevoProducto = () => {
  const router = useRouter();

  const [message, setMessage] = useState<string | null>(null);

  const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
    update(cache, { data: { nuevoProducto } }) {
      const { obtenerProductos } = cache.readQuery({
        query: OBTENER_PRODUCTOS,
      });
      cache.writeQuery({
        query: OBTENER_PRODUCTOS,
        data: {
          obtenerProductos: [
            ...obtenerProductos,
            nuevoProducto,
          ],
        },
      });
    },
  });
  const formik = useFormik({
    initialValues: {
      nombre: '',
      existencia: 0,
      precio: 0,
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre del cliente es obligatorio'),
      existencia: Yup.number().positive().required('la existencia es obligatoria'),
      precio: Yup.number().positive().required('El precio es obligatorio'),
    }),
    onSubmit: async (values) => {
      const {
        nombre,
        existencia,
        precio,
      } = values;
      console.log(values);
      try {
        const { data } = await nuevoProducto({
          variables: {
            input: {
              nombre,
              existencia,
              precio,
            },
          },
        });
        router.push('/productos');
      } catch (error) {
        setMessage(error.message);
        console.log(error);
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      }
    },
  });

  const showMessage = () => (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{message}</p>
    </div>
  );

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Producto</h1>
      {message && showMessage()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                placeholder="Nombre Producto"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            { formik.touched.nombre && formik.errors.nombre
              && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.nombre}</p>
              </div>
              )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">
                Existencia
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="existencia"
                type="number"
                placeholder="Existencia Producto"
                value={formik.values.existencia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            { formik.touched.existencia && formik.errors.existencia
              && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.existencia}</p>
              </div>
              )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                Precio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="precio"
                type="number"
                placeholder="Precio Producto"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            { formik.touched.precio && formik.errors.precio
              && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.precio}</p>
              </div>
              )}
            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white font-bold hover:bg-gray-900"
              value="Registrar Producto"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoProducto;
