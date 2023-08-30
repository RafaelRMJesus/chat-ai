import prismadb from "@/lib/prismadb";
import { PersonForm } from "./components/person-form";
import * as z from "zod"
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface PersonIdProps {
  params: {
    personId: string;
  }
}

const PersonId = async ({
  params
} : PersonIdProps) => {
  const { userId } = auth();

  if(!userId) {
    return redirectToSignIn()
  }

 //TODO: check subscription

  const person = await prismadb.person.findUnique({
    where: {
      id: params.personId,
      userId
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