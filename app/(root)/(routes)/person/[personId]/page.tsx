import prismadb from "@/lib/prismadb";
import PersonForm from "./components/person-form";
import * as z from "zod"

interface PersonIdProps {
  params: {
    personId: string;
  }
}

const PersonId = async ({
  params
} : PersonIdProps) => {
 //TODO: check subscription

  const person = await prismadb.person.findUnique({
    where: {
      id: params.personId
    }
  });

  const categories = await prismadb.category.findMany()

  return (
    <PersonForm
      initialData={person}
      categories={categories}
    />
  );
}
 
export default PersonId;