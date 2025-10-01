import { Button } from "./_components/ui/button";

const Home = () => {
  return (
    <div className="flex w-screen items-center justify-center">
      <h1 className="text-primary p-5 text-3xl font-bold">Hello World</h1>
      <Button>Click me</Button>
    </div>
  );
};

export default Home;
