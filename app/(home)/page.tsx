import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EmptyCard from "../transactions/_components/empty-card";

const Home = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }
  return (
    <div className="flex items-center justify-center">
      <EmptyCard />
    </div>
  );
};

export default Home;
