import HeadTag from "@/components/HeadTag";
import TodoItems from "@/components/TodoItems";
import AddTodoForm from "@/components/AddTodoForm";
import Logout from "@/components/Logout";

function Home() {
  return (
    <div className="absolute w-1/2 max-w-[600px] rounded-md border p-4 text-white shadow-md backdrop-blur-lg">
      <HeadTag>TODO LIST</HeadTag>
      <Logout />
      <AddTodoForm />
      <TodoItems />
    </div>
  );
}

export default Home;
