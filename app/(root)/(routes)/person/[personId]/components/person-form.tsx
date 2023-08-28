"use client"

import { Category, Person } from "@prisma/client";

interface PersonFormProps {
  initialData: Person | null
  categories: Category[];
}

const PersonForm = ({
  categories, initialData
}: PersonFormProps) => {
  return (
    <div>
      PersonForm
    </div>
  );
}
 
export default PersonForm;