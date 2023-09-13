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
          if (curr.id == editing) {
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
    <section className="bg-slate-900 h-screen overflow-y-scroll text-white">
      <div className="animate-pulse duration-1000 mt-7">
        <h1 className="text-5xl text-center py-4 animate-bounce  duration-500 ">
          Todo list
        </h1>
      </div>
      <form onSubmit={handlesubmit}>
        <div className="w-[70%] px-4 mb-20 justify-around flex items-center  my-10 left-[15%]  mx-auto">
          <div className="py-4">
            <input
              ref={ref}
              type="text"
              placeholder="Enter your task"
              className="px-2 py-4 rounded-lg font-medium  text-black outline-yellow-500 outline-8 text-xl  w-[1000px]"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <ToastContainer pauseOnFocusLoss={false} limit={2} />
          {toggle ? (
            <button className="border border-white p-4 text-xl text-green-500 bg-orange-300 hover:bg-blue-400 font-semibold hover:text-white">
              Save Change
            </button>
          ) : (
            <button className="border-2  border-white py-4 px-7 text-xl text-green-500 bg-orange-300 hover:bg-blue-400 font-semibold hover:text-white">
              Add task
            </button>
          )}
        </div>
      </form>
      {addtask.map((e, i) => {
        return (
          <div
            key={i}
            className="  text-black border border-white/50 bg-white/10  shadow-xl shadow-orange-50/20  text-xl flex items-center w-[67%] mx-auto mt-10 py-5 relative "
          >
            <div className="flex w-full justify-around gap-x-5 ">
              <h1 className=" w-[70%]  p-4 flex text-2xl overflow-auto  h-auto flex-col text-white gap-y-5">
                {e.task}
              </h1>
              <p className="text-sm absolute bottom-0 left-11 text-red-800">
                <span className="text-white">Created on &nbsp;</span>
                {e.date}
              </p>
              <div className="flex w-[20%] justify-around">
                <button
                  onClick={() => deleteTodo(e.id)}
                  className="border hover:animate-pulse border-white py-4 px-8 text-xl text-green-500  hover:bg-red-500 font-semibold hover:text-white"
                >
                  Delete
                </button>
                <button
                  onClick={() => editTodo(e.id)}
                  className="border hover:animate-pulse border-white py-4 px-8 text-xl text-green-500  hover:bg-blue-400 font-semibold hover:text-white"
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
