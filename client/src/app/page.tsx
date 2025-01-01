import { fetchAllUsers } from "@/lib/actions";


export default async function Home() {

  const res = await fetchAllUsers();

  console.log(res);
  

  return (
    <div>
     
    </div>
  );
}
