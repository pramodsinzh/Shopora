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
  const { userId } = await auth()
  let orders = null;
  if (userId) {
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
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-1">
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <ClerkLoaded>
            {user && (
              <Link
                href={"/orders"}
                aria-label="View orders"
                className='relative flex items-center justify-center w-9 h-9 rounded-full text-darkColor/70 hover:text-shop_dark_green hover:bg-shop_light_green/10 transition-colors duration-200'
              >
                <Logs className='w-[18px] h-[18px]' />
                {orders?.length ? (
                  <span className='absolute top-0.5 right-0.5 bg-shop_dark_green text-white h-4 w-4 rounded-full text-[10px] font-semibold flex items-center justify-center'>
                    {orders.length > 9 ? "9+" : orders.length}
                  </span>
                ) : null}
              </Link>
            )}
            <div className="ml-1">
              {user ? <UserButton /> : <SignIn />}
            </div>
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  )
}

export default Header