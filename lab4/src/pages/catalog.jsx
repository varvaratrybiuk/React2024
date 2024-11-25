import NavigationBar from "../components/navigationBar/navigationBar";

import { useLoaderData } from "react-router";

export default function Catalog() {
   const result = useLoaderData();

    console.log(result)
  return (
    <div>
      <NavigationBar />
      <div></div>
    </div>
  );
}
