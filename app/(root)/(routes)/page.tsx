import { UserButton } from "@clerk/nextjs";

const RootPage = () => {
  return (
    <div className="p-4">
      <UserButton afterSignOutUrl="/"/>
    </div>

  );
}
 
export default RootPage;