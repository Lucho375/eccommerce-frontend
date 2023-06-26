import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Avatar, Box, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { AiOutlineShoppingCart } from 'react-icons/ai'

export default function Header() {
  const { auth, logout } = useAuth()

  return (
    <header className="bg-test">
      <nav className="container flex items-center justify-between px-4 py-4 mx-auto">
        <Link to="/" className="text-2xl font-bold text-white">
          Inicio
        </Link>
        <ul className="flex space-x-4">
          {auth?.isAuthenticated ? (
            <>
              <li>
                <Link to="/products" className="text-white transition-colors duration-300 hover:text-gray-300">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-white transition-colors duration-300 hover:text-gray-300">
                  <AiOutlineShoppingCart className="text-3xl" />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-white transition-colors duration-300 hover:text-gray-300">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white transition-colors duration-300 hover:text-gray-300">
                  Registrate
                </Link>
              </li>
            </>
          )}
        </ul>
        {auth.isAuthenticated && (
          <Menu>
            <MenuButton as={Box} display="flex" alignItems="center" cursor="pointer">
              <Avatar size="md" name={auth?.user?.name} src={auth?.user?.avatar} />
              <IconButton icon={<ChevronDownIcon color="white" />} variant="unstyled" size="sm" />
            </MenuButton>
            <MenuList background="test">
              <MenuItem background="test" color="white">
                <Link to="/profile">Perfil</Link>
              </MenuItem>
              <MenuItem background="test" color="white">
                <Link to="/my_purchases">Mis compras</Link>
              </MenuItem>
              {auth?.isAdmin && (
                <MenuItem background="test" color="white">
                  <Link to="/dashboard">Dashboard</Link>
                </MenuItem>
              )}
              <MenuItem background="test" color="white" onClick={logout}>
                Cerrar sesión
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </nav>
    </header>
  )
}
