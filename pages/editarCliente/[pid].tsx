import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Formik} from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import Layout from '../../components/Layout';

const OBTENER_CLIENTE = gql`
  query obtenerCliente($id:ID!){
    obtenerCliente(id:$id){
      nombre
      apellido
      email
      telefono
      empresa
    }
  }
`;
const ACTUALIZAR_CLIENTE = gql`
  mutation actualizarCliente($id:ID!, $input:ClienteInput){
    actualizarCliente(id:$id, input:$input){
      nombre
      apellido
      empresa
      email
      telefono
    }
  }
`;

const EditarCliente = () => {
  const router = useRouter();
  const { query: { id } } = router;
  const { data, loading } = useQuery(OBTENER_CLIENTE, {
    variables: {
      id,
    },
  });

  const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE);

  const schemaValidacion = Yup.object({
    nombre: Yup.string().required('El nombre del cliente es obligatorio'),
    apellido: Yup.string().required('El apellido del cliente es obligatorio'),
    empresa: Yup.string().required('La empresa del cliente es obligatorio'),
    email: Yup.string().email('email no válido').required('El email del cliente es obligatorio'),
  });

  if (loading) return 'Cargando...';

  const { obtenerCliente } = data;

  const actualizarInfoCliente = async (values:any)=> {
    const {
      nombre,
      apellido,
      empresa,
      email,
      telefono,
    } = values;
    try {
      await actualizarCliente({
        variables: {
          id,
          input: {
            nombre,
            apellido,
            empresa,
            email,
            telefono,
          },
        },
      });
      Swal.fire(
        'Actualizado!',
        'El usuario se actualizó correctamente',
        'success',
      );
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Desde Editar</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues={obtenerCliente}
            onSubmit={(values) => {
              actualizarInfoCliente(values);
            }}
          >
            {(props) => (
              <form
                className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={props.handleSubmit}
            >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                    Nombre
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nombre"
                    type="text"
                    placeholder="Nombre Cliente"
                    value={props.values.nombre}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>
                { props.touched.nombre && props.errors.nombre
                  && (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.nombre}</p>
                  </div>
                  )}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                    Apellido
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="apellido"
                    type="text"
                    placeholder="Apellido Cliente"
                    value={props.values.apellido}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>
                {props.touched.apellido && props.errors.apellido
                  && (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.apellido}</p>
                  </div>
                  )}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                    Empresa
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="empresa"
                    type="text"
                    placeholder="Empresa Cliente"
                    value={props.values.empresa}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>
                {props.touched.empresa && props.errors.empresa
                  && (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.empresa}</p>
                  </div>
                  )}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email Cliente"
                    value={props.values.email}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>
                {props.touched.email && props.errors.email
                  && (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.email}</p>
                  </div>
                  )}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                    Telefono
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="telefono"
                    type="tel"
                    placeholder="Telefono Cliente"
                    value={props.values.telefono}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                </div>
                <input
                  type="submit"
                  className="bg-gray-800 w-full mt-5 p-2 text-white font-bold hover:bg-gray-900"
                  value="Editar Cliente"
                />
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarCliente;