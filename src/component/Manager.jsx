import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords=async ()=>{
    let req=await fetch("http://localhost:9000/all")
    let passwords=await req.json();
    if(passwords.success)
    {setPasswordArray(passwords.data)}
    console.log(passwordArray)
  }
  useEffect(() => {
   getPasswords()
  }, []);


  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  

  const ShowPassword = () => {
    if (passwordRef.current) {
      passwordRef.current.type =
        passwordRef.current.type === "password" ? "text" : "password";
      ref.current.src =
        passwordRef.current.type === "password" ? "icons/eye.png" : "icons/eyecross.png";
    }
  };
  
  const savePassword = async () => {

    if(form.site.length>0 && form.username.length>0 && form.password.length>0)
    {
      setPasswordArray([...passwordArray, form]);
      let req=await fetch("http://localhost:9000/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
          //let response = await req.json();
          //setPasswordArray([...passwordArray, response.data]); 
          setform({ site: "", username: "", password: "" });
        getPasswords()
    }
   
  };
  const deletePassword = async (id) => {
    setPasswordArray(passwordArray.filter(item=>item._id!==id))
    await fetch(`http://localhost:9000/del/${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      getPasswords()
  };
  const editPassword = async (id) => {
    setform(passwordArray.filter(i=>i._id===id)[0])
    //setPasswordArray(passwordArray.filter(item=>item._id!==id))
    deletePassword(id)
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      
      <div className="absolute inset-0 -z-10 h-full w-full bg-purple-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className=" bg-purple-50 px-2 md:px-0 md: mycontainer ">
        <h1 className="text-4xl text text-center font-bold">
          {" "}
          <span className="text-red-500">&lt;/</span>
          Pass
          <span className="text-red-500">OP/ &gt;</span>{" "}
        </h1>
        <p className="text-red-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className=" flex flex-col p-4 gap-8">
          <input
            value={form.site}
            onChange={handleChange}
            type="text"
            placeholder="Enter website URL"
            className="rounded-full border  border-red-900 w-full p-4 py-1"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              className="rounded-full border border-red-900 w-full p-4 py-1"
            />

            <div className="relative">
              <input
                value={form.password}
                ref={passwordRef}
                onChange={handleChange}
                type="text"
                id="password"
                placeholder="Enter Password"
                name="password"
                className="rounded-full border border-red-900 w-full p-4 py-1"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={ShowPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 border border-red-900 bg-red-400 rounded-full w-40 m-auto py-1.5 hover:bg-red-300"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-red-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-red-100">
                {passwordArray.map((item,index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 border border-white text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item._id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item._id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
