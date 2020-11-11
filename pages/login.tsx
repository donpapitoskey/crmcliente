/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const AUTENTICAR_USUARIO = gql`
mutation autenticarUsuario($input: AutenticarInput){
  autenticarUsuario(input: $input){
    token
  }
}
`;

const Login = () => {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('El email no es válido').required('El email es requerido'),
      password: Yup.string().required('Es obligatorio'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const { email, password } = values;

      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
        setMessage('Autenticando...');

        const { token } = data.autenticarUsuario;
        localStorage.setItem('token', token);

        setTimeout(() => {
          setMessage(null);
          router.push('/');
        }, 3000);
      } catch (error) {
        setMessage(error.message);

        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    },
  });

  const showMessage = () => (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{message}</p>
    </div>
  );

  return (
    <div>
      <Layout>
        <h1 className="text-center text-2xl text-white font-white">Login</h1>
        {message && showMessage()}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email Usuario"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              { formik.touched.email && formik.errors.email
              && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
              )}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Constaseña Usuario"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              { formik.touched.password && formik.errors.password
              && (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.password}</p>
              </div>
              )}
              <input
                type="submit"
                className="bg-gray-800 w-full mt-*5 p-2 text-white uppercase hover:bg-gray-900"
                value="Login"
              />
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
