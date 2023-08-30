import { Persons } from "@/components/persons";
import Categories from "@/components/ui/categories";
import { SearchInput } from "@/components/ui/search-input";
import prismadb from "@/lib/prismadb";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string
  }
}

const RootPage = async ({
  searchParams
}: RootPageProps) => {


  const data = await prismadb.person.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    }
  })

  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Persons data={data}/>
    </div>
  );
}
 
export default RootPage;