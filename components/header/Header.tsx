import React from 'react'
import Container from '../Container'
import Logo from '../Logo'
import HeaderMenu from './HeaderMenu' 
import CartIcon from '../cart/CartIcon'
import FavoriteButton from '../wishlist/FavoriteButton'
import SignIn from '../SignIn'
import MobileMenu from '../MobileMenu'
import { auth, currentUser } from '@clerk/nextjs/server'
import { ClerkLoaded, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { getMyOrders } from '@/sanity/queries'
import { Logs } from 'lucide-react' 
import SearchBar from '../SearchBar'

const Header = async () => {
  const user = await currentUser() 
  const {userId} = await auth()
  let orders = null;
  if(userId){
    orders = await getMyOrders(userId)
  }
  
  return (
    <header className='bg-white/70 py-5 sticky top-0 z-50 backdrop-blur-md'>
      <Container className='flex items-center justify-between text-lightColor'>
        <div className="w-auto md:w-1/3 flex items-center justify-start gap-2.5 md:gap-0">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <ClerkLoaded>
            {user && <Link className='group relative group-hover:text-shop_light_green hoverEffect' href={"/orders"}>
              <Logs />
              <span className="absolute -top-1 -right-1 bg-shop_btn_dark_green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">{orders?.length ? orders?.length : 0}</span>
            </Link>}
            {user ? <UserButton /> : <SignIn />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  )
}

export default Header
