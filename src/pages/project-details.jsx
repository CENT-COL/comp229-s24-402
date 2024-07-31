import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import {doc, getDoc, setDoc, addDoc, collection} from 'firebase/firestore';

const ProjectDetails = () => {
    const [project, setProject] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if(id){
        const fetchProject = async () => {
          try {
            const docRef = doc(db, 'projects', id); // same as mongo db.project.find({id})
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
              const data = docSnap.data();
              setProject({
                name: data.name,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate
              });
            }
          } catch (error) {
            console.log('Error fetching project', error);
          }
        }

        fetchProject();
      }
    }, [id]);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setProject(prevState => ({...prevState, [name]: value}));
    };  

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id);
        try {
          if(id){
            const docRef = doc(db, 'projects', id);
            await setDoc(docRef, project);
          } else  {
            await addDoc(collection(db, 'projects'), project);
          }

          navigate('/projects')
        } catch (error) {
          
          console.error('Error saving a project', error);
        }
    };

    return (
        <div className="container mt-4">
        <h1 className="text-center">{id ? 'Update Project' : 'Create Project'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={project.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={project.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
              value={project.startDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              name="endDate"
              value={project.endDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {id ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    )
}

export default ProjectDetails;