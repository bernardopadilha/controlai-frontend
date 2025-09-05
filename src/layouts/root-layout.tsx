import { Navbar } from '@/components/navbar'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="relative h-screen w-full flex-col">
      <Navbar />
      <Outlet />
    </div>
  )
}
