import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Todo = () => {
  const [task, setTask] = useState("");
  const [editing, setEditing] = useState(null);
  const [toggle, settoggle] = useState(false);
  const ref = useRef();
  const [addtask, setAddtask] = useState(() => {
    const localvalue = localStorage.getItem("Todo");
    if (localvalue.length === null) return [];
    return JSON.parse(localvalue);
  });
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!task) {
     toast.warn("Field can't be empty!", {
       position: "top-right",
       theme: "dark",
     });
    }
    // console.log(<tas></tas>k);
    else if (task && toggle) {
      setAddtask(
        addtask.map((curr) => {
          if (curr.id === editing) {
            return { ...curr, task: task };
          }
          return curr;
        })
      );
      settoggle(false);
      setTask("");
      setEditing(null);
    } else {
      const allInputdata = {
        id: new Date().getTime().toString(),
        date: new Date().toString(),
        task: task,
      };
      setAddtask(() => {
        return [...addtask, allInputdata];
      });
      settoggle(false);
      toast.success("🦄 Wow so easy!", {
        position: "top-right",
        theme: "dark",
      });
      setTask("");

    }

    // setTask("");
  };
  useEffect(() => {
    // const localvalue = localStorage.getItem("Todo");
    // if (localvalue.length === null) return [];

    localStorage.setItem("Todo", JSON.stringify(addtask));
    // return JSON.parse(localvalue);
  }, [addtask]);
  const deleteTodo = (id) => {
    setAddtask((e) => {
      return e.filter((todo) => todo.id !== id);
    });
    settoggle(false);
    toast("🦄 Todo Deleted!", {
      position: "top-right",
      hideProgressBar: false,
      theme: "dark",
    });
  };

  const editTodo = (id) => {
    console.log(id);
    settoggle(true);
    const edit = addtask.find((i) => i.id == id);
    setTask(edit.task);
    setEditing(id);
    ref.current.focus();
  };

  return (
    <section className="bg-slate-900 h-screen w-full overflow-y-scroll px-2 text-white">
      <div className="animate-pulse duration-1000 mt-7 ">
        <h1 className="text-5xl text-center py-4 animate-bounce  duration-500 ">
          Todo list
        </h1>
      </div>
      <form onSubmit={handlesubmit}>
        <div className=" max-w-7xl px-2   mb-20 justify-between md:flex items-center gap-x-2 mt-10   mx-auto">
          <div className="py-4 md:w-[80%] w-full">
            <input
              ref={ref}
              type="text"
              placeholder="Enter your task"
              className="px-2 py-4 rounded-lg font-medium  text-black outline-yellow-500 outline-8 text-xl mx-auto  w-[100%]"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <ToastContainer pauseOnFocusLoss={false} limit={2} />
          <div className="w-[150px] mx-auto">
            {toggle ? (
              <button className="border border-white mx-auto w-[150px] h-[60px] text-xl text-green-500 bg-orange-300 hover:bg-blue-400 font-semibold hover:text-white">
                Save Change
              </button>
            ) : (
              <button className="border-2  border-white  mx-auto w-[150px] h-[60px] text-xl md:mt-0 mt-10 -mb-[40px] md:mb-0 text-green-500 bg-orange-300 hover:bg-blue-400 font-semibold hover:text-white">
                Add task
              </button>
            )}
          </div>
        </div>
      </form>
      {addtask.map((e, i) => {
        return (
          <div
            key={i}
            className="  text-black border max-w-7xl px-2 relative  border-white/50 bg-white/10  shadow-xl shadow-orange-50/20  text-xl flex items-center w-[full] mx-auto mt-10 py-5 "
          >
            <div className="flex mx-auto w-full justify-evenly gap-x-2  ">
              <h1 className=" w-[70%]  bg-red-400 p-5 flex md:text-2xl text-lg overflow-auto  h-auto flex-col text-white gap-y-5">
                {e.task}
              </h1>
              <p className="md:text-sm text-xs absolute right-[1%]  bottom-0 md:w-[250px] w-[200px] whitespace-nowrap text-ellipsis overflow-hidden text-red-800">
                <span className="text-white">Created on &nbsp;</span>
                {e.date}
              </p>
              <div className="flex md:flex-row flex-col gap-y-2 py-1 items-center gap-x-4 ">
                <button
                  onClick={() => deleteTodo(e.id)}
                  className="border hover:animate-pulse border-white  mx-auto md:w-[150px] w-[100px] md:h-[60px] h-[40px]  text-xl text-green-500  hover:bg-red-500 font-semibold hover:text-white"
                >
                  Delete
                </button>
                <button
                  onClick={() => editTodo(e.id)}
                  className="border hover:animate-pulse border-white  mx-auto md:w-[150px] w-[100px] md:h-[60px] h-[40px] text-xl text-green-500  hover:bg-blue-400 font-semibold hover:text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Todo;
