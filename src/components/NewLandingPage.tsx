import Home from "./Home"
import Header from "./Header"
import Footer from "./Footer"
import Policies from "./Policies"

export default function NewLandingPage() {
  return (
   <>
    <Header/>
      <Home/>
      <div className="col-span-2 w-full mt-8 mb-20">
        <Policies />
      </div>
      <div className="col-span-2 w-full mt-8">
        <Footer />
      </div>
   </>
  )
}
