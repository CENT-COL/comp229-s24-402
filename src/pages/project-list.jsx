import React,{useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore';
import {db} from '../firebase';
import { useAuth } from '../contexts/auth-context';

const Projectlist = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        if(!currentUser){
          navigate('/login');
          return;
        }

        const fetchProjects = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'projects'));
            const projectsData = querySnapshot.docs.map(doc => ({...doc.data(), _id: doc.id}));
            setProjects(projectsData);
          } catch (error) {
            console.error('Error fetching projects', error);
          }
        }
        fetchProjects();

      }, [currentUser, navigate]);


    const handleDelete = async (id) => {
        try {
          await deleteDoc(doc(db, 'projects', id))
          setProjects(projects.filter(project => project._id !== id));
        } catch (error) {
          console.error('Error deleting project', error);
        }
    }



    return (
        <div className="container mt-4">
          <h1 className="text-center">Projects</h1>
          
          <button className="btn btn-primary mb-3" onClick={() => navigate('/project-details')}>
            Create New Project
          </button>
          
          {projects.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{new Date(project.startDate).toLocaleDateString()}</td>
                    <td>{new Date(project.endDate).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-secondary mr-2"
                        onClick={() => navigate(`/project-details/${project._id}`)}
                      >
                        Update
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(project._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No projects available.</p>
          )}
        </div>
      );
}

export default Projectlist;