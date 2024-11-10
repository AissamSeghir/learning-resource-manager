import React from "react";
import Logo from "/logo-transparent.png";
import "./homedash.css";
import { useMutation, useQuery } from "@tanstack/react-query";

const fetchResources = async () => {
  const response = await fetch(`/api/resources`);
  if (!response.ok) throw new Error("Error fetching students");
  return response.json();
};
function Homedash() {
  // Fetch ressources data
  const {
    data: resourcesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
  });
  console.log("data", resourcesData);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="home-dash">
      <header>
        <img src={Logo} alt="log" />
      </header>
      <section>
        <div className="content">
          {resourcesData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Tags</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {resourcesData.map((resource, i) => (
                  <tr key={resource._id}>
                    <td>{i + 1}</td>
                    <td>{resource.title}</td>
                    <td>{resource.type}</td>
                    <td>
                      {resource.tags.length > 0
                        ? resource.tags.join(", ")
                        : "No tags"}
                    </td>
                    <td className="btns">
                      <button>
                        <i className="fa-regular fa-eye"></i>
                      </button>
                      <button className="edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No data</div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Homedash;
