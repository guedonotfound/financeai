import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/login");
  }
  return (
    <>
      <div className="w-full items-center justify-center py-10 text-center text-5xl">
        Page being created
      </div>
    </>
  );
};

export default SubscriptionPage;
