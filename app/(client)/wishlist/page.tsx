import NoAccess from '@/components/NoAccess'
import WishListProducts from '@/components/wishlist/WishListProducts'
import { currentUser } from '@clerk/nextjs/server'

const WishListPage = async () => {
    const user = await currentUser()
    return (
        <>
            {user ? (
                <WishListProducts />
            ) : (
                <NoAccess details='Login to view your wishlist items. Don&apos;t miss out on your cart products to make the payment!' />
            )}
        </>
    )
}

export default WishListPage