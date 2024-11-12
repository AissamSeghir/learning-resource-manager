import React, { useState } from "react";
import Logo from "/logo-transparent.png";
import "./homedash.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import EditResource from "../forms/EditResource";
import ViewResource from "../viewResource/ViewResource";

const fetchResources = async () => {
  const response = await fetch(`/api/resources`);
  if (!response.ok) throw new Error("Error fetching resources");
  return response.json();
};

const deleteResource = async (resourceId) => {
  const response = await fetch(`/api/resources/${resourceId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete resource");
  }
  return response.json();
};

function Homedash() {
  const [activeTab, setActiveTab] = useState("resources");
  const [resourceEdite, setResourceEdite] = useState({});
  const [resourceView, setResourceView] = useState({});
  const queryClient = useQueryClient();

  // Ensure hooks are always called at the top level
  const {
    data: resourcesData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["resources"],
    queryFn: fetchResources,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteResource,
    onSuccess: () => {
      toast.success("Resource deleted successfully!");
      queryClient.invalidateQueries(["resources"]);
    },
    onError: (error) => {
      toast.error("Failed to delete resource: " + error.message);
    },
  });

  // Define event handlers
  const handleEditResource = (editeResource) => {
    setActiveTab("editResource");
    setResourceEdite(editeResource)
  };

  const handleViewResource = (resourceView) => {
    setActiveTab("viewResource");
    setResourceView(resourceView)
  };

  const handleDeleteResource = (resourceId) => {
    console.log(resourceId);

    toast((t) => (
      <div className="modal">
        <div className="modal_content">
          <h3>Are you sure?</h3>
          <p>This action cannot be undone.</p>
          <button
            style={{backgroundColor:"#F95454"}}
            className="confirm"
            onClick={() => {
              deleteMutation.mutate(resourceId); // Call the delete function
              toast.dismiss(t.id); // Dismiss the toast
            }}
          >
            Confirm
          </button>
          <button 
          style={{backgroundColor:"#00FF9C"}}
          className="cancel-btn" onClick={() => toast.dismiss(t.id)}>
          Cancel
        </button>
        </div>
      </div>
    ));
  };

  // Render loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  const onChangeActiveTabe = ()=>{
    setActiveTab("resources")
  }
  return (
    <div className="home-dash">
      <header>
        <img src={Logo} alt="logo" />
      </header>
      <section>
        {activeTab === "resources" && (
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
                        {resource.tags && resource.tags.length > 0
                          ? resource.tags.join(", ")
                          : "No tags"}
                      </td>
                      <td className="btns">
                        <button onClick={()=>handleViewResource(resource)}>
                          <i className="fa-regular fa-eye"></i>
                        </button>
                        <button className="edit" onClick={()=>handleEditResource(resource)}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => handleDeleteResource(resource._id)}
                        >
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
        )}
        {activeTab === "editResource" && <EditResource resourceEdite={resourceEdite} onChangeActiveTabe={onChangeActiveTabe}/>}
        {activeTab === "viewResource" && <ViewResource resourceView={resourceView} />}
      </section>
    </div>
  );
}

export default Homedash;