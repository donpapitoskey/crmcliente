import * as React from "react";
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div >
        <p className="text-white text-2xl font-black" >CMRCLIENTES</p> 
      </div>
      <nav className="mt-5 list-none">
        <li>
          <Link href="/">
            <a className="text-white mb-3 block">
              Clientes
            </a>
          </Link>
        </li>
        <li>
          <Link href="/pedidos">
            <a className="text-white mb-3 block">
              Pedidos
            </a>
          </Link>
        </li>
        <li>
          <Link href="/productos">
            <a className="text-white mb-3 block">
              Productos
            </a>
          </Link>
        </li>
      </nav>
    </aside>
    
  ) 
};

export default Sidebar;