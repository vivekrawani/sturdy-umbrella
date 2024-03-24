import Banners from "@/components/Dashboard/Banners";
import Greetings from "@/components/Dashboard/Greetings";
import Notifications from "@/components/Notifications/Notifications";
export default function Dashboard() {
  return (
    <div className="flex flex-col justify-center gap-5 my-5 mx-10 ">
      <Greetings />
      <Banners />

    </div>
  )
}
