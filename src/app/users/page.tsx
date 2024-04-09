import UsersTable from "@/components/Users/UsersTable";
import { getAllUsers } from "@/db/firebase";

export default async function Users() {
  const data  =await getAllUsers();
  return (
     <UsersTable data={data}/>
  )
}

