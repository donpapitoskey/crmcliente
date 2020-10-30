import React from "react";
import Layout from "../components/Layout";
import {useFormik} from "formik";

const NewAccount = () => {
  
  const formik = useFormik({
    initialValues: {
      nombre: 'Name',
      apellido: '',
      email: '',
      password: '',
    },
    onSubmit: valores => {
      console.log('enviando');
      console.log(valores);
    }
  });
  
  return(
  <>
    <Layout>
      <h1 className="text-center text-2xl text-white font-white">Setup new account</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form 
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          > 
          <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Nombre
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nombre"
                  type="text"
                  placeholder="Nombre Usuario"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Apellido
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="apellido"
                  type="text"
                  placeholder="Apellido Usuario"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email Usuario"
                  value={formik.values.email}
                  onChange={formik.handleChange}/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Password
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Email Usuario"
                  value={formik.values.password}
                  onChange={formik.handleChange}/>
            </div>
            <input 
              type="submit"
              className="bg-gray-800 w-full mt-*5 p-2 text-white uppercase hover:bg-gray-900"
              value="Creat Cuenta"
            />
          </form>
        </div>
      </div>
    </Layout>
  </>
)};

export default NewAccount;
