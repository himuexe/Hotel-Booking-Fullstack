import Footer from "../components/Footer"
import Header from "../components/Header"
import Hero from "../components/Hero"

 interface Props{
    children: React.ReactNode;
 }
export default function Layout({children}: Props) {
  return (
    <div className="flex flex-col min-h-screen  -z-10 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <Header/>
        <Hero/>
        <div className="container mx-auto py-10 flex-1">{children}</div>
        <Footer/>
    </div>
  )
}
// absolute inset-0  h-full w-full items-center px-5 py-24 