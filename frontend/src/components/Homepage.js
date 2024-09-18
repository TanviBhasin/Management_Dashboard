import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApiServices from "./ApiServices";

export default function Homepage() {
  const navigate = useNavigate();
  const [data,setData]=useState([])
  const [x,setX]=useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  
  useEffect(() => {
      ApiServices.getJob({}).then((response) => {
          console.log("Get All API Response:", response);    
          setData(response.data.data);
          toast.success(response.data.message)
        })
        .catch((error) => {
          console.log("Error:", error);
          
        });
    }, []);

    const deleteData=(id)=>{
      let data={
          _id:id
      }
  
      ApiServices.deleteJob(data).then((res)=>{
          toast.success(res.data.message)
          setX(true)
          navigate('/');
      }).catch((err)=>{
          toast.error("Something went wrong")
      })
      setX(false)
     }


     // Filter data based on searchTerm
      const filteredData = data.filter(el => 
        el.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        el._id.toLowerCase().includes(searchTerm.toLowerCase())
      );

   
  return (
    <>
        <div className="container-fluid" style={{ backgroundColor: "#f0f0f0" }}>
        
          <div className="row ms-2 me-2">
          <div className="card mt-3 mb-5">
                   <div>
                    <h3 className="text-light text-center mt-3 mb-2 pt-2 pb-2 fs-5 rounded-top-1" style={{backgroundColor:"#004080"}}>HARDIK TRADERS - CLIENT MANAGEMENT DASHBOARD</h3>          
                    </div>

                    <div className="d-flex" role="search">
                    <input className="form-control me-2" type="search" value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by Client Name or ID..." aria-label="Search"/>
                    <button className="btn text-white" type="submit" style={{backgroundColor:"#004080"}}>Search</button>
                    </div>

               <div className="d-flex justify-content-center mt-3 mb-3">
                <Link to={"/add"}>
                <button className="btn text-white fs-6" style={{backgroundColor:"#004080"}}>New Job Sheet</button>
                </Link>
                        
                    </div>
            <div
              className="col-md-12 mb-5">
              
              <table className="table table-striped mx-auto">
                <thead>
                  <tr>
                    <th scope="col" className="text-light" style={{ backgroundColor:"#004080"}}>#</th>
                    <th scope="col" className="text-light" style={{backgroundColor:"#004080"}}>Client Id</th>
                    <th scope="col" className="text-light" style={{backgroundColor:"#004080"}}>Client Name</th>
                    <th scope="col" className="text-light" style={{backgroundColor:"#004080"}}>Contact Info</th>
                    <th scope="col" className="text-light" style={{backgroundColor:"#004080"}}>Received Date</th>
                    <th scope="col" className="text-light" style={{backgroundColor:"#004080"}}>Inventory Received</th>
                    <th scope="col" className="text-light" style={{backgroundColor:"#004080"}}>Reported Issues</th>
                    <th scope="col" className="text-light" style={{backgroundColor:"#004080"}}>Client Notes</th>
                    <th scope="col" className="text-light" style={{backgroundColor:"#004080"}}>Assigned Technician</th>
                    <th scope="col" className="text-light" style={{backgroundColor:"#004080"}}>Estimated Amount</th>
                    <th scope="col" className="text-light" style={{backgroundColor:"#004080"}}>Deadline</th>
                    <th scope="col" className="text-light" style={{backgroundColor:"#004080"}}>Status</th>
                    <th scope="col" className="text-light" style={{backgroundColor:"#004080"}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {filteredData?.map((el,index)=>(
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{el?._id}</td>
                    <td>{el?.name}</td>
                    <td>{el?.phone}</td>
                    <td>{el?.date}</td>
                    <td>{el?.inventory}</td>
                    <td>{el?.report}</td>
                    <td>{el?.notes}</td>
                    <td>{el?.technician}</td>
                    <td>{el?.amount}</td>
                    <td>{el?.deadline}</td>
                    <td>{el?.status}</td>


                    <td>
                      <Link to={"/view/"+el._id} >
                      <button className="btn-sm btn me-1 text-white" style={{ backgroundColor:"#004080"}}>View</button>
                      </Link>
         
                      <Link to={"/edit/"+el._id}>
                      <button className="btn btn-sm me-1 text-white" style={{ backgroundColor:"#fb830f"}}>Edit</button>
                      </Link>  
                    
                      <Link to={"/delete/"+el._id}>
                        <button className="btn btn-sm btn-danger mt-1" onClick={()=>{
                            deleteData(el._id)
                        }}>Delete</button>
                        </Link>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
        
            <div className="row text-white justify-content-center fs-6 ms-1 me-1 rounded-bottom-1 p-2 mb-3" style={{backgroundColor:"#004080"}}>&copy; 2024 Hardik Traders</div>
            
            </div>
          
          </div>



         
        </div>
      </>
  )
}
