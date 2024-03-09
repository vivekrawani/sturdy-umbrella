import Banners from "@/components/Dashboard/Banners";
import Greetings from "@/components/Dashboard/Greetings";
import Notifications from "@/components/Dashboard/Notifications";
export default function Dashboard() {
  return (
    <div className="flex flex-col justify-center gap-5 mt-2 mx-10 ">
      <Greetings />
      <Notifications />
      <Banners />

    </div>
  )
}
