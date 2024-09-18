import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import ApiServices, { BASE_URL } from "./ApiServices"
import jsPDF from "jspdf";

export default function ViewJob() {
    const param = useParams();
    const id = param.id;
    const navigate = useNavigate();
    const [job, setJob] = useState("");
    const [newNote, setNewNote] = useState("");  
    const [notes, setNotes] = useState([]); 
    const [x,setX]=useState(false)     

    useEffect(()=>{
        let data={
            _id:id
        }
            
        ApiServices.singleJob(data).then((res)=>{
                console.log(res);
                setJob(res.data.data);
                toast.success(res.data.message);        
            }).catch((err)=>{
                console.log(err);
            })
       },[id])


       const handleDownloadPdf = () => {
        const pdf = new jsPDF();
    
        // Set the title
        pdf.setFontSize(16);
        pdf.text("Job Sheet", 20, 20);
    
        // Set the body text
        pdf.setFontSize(12);
        const details = [
          `Client Name: ${job ? job.name : 'N/A'}`,
          `Contact Info: ${job ? job.phone : 'N/A'}`,
          `Received Date: ${job ? job.date : 'N/A'}`,
          `Inventory Received: ${job ? job.inventory : 'N/A'}`,
          `Reported Issues: ${job ? job.report : 'N/A'}`,
          `Client Notes: ${job ? job.notes : 'N/A'}`,
          `Assigned Technician: ${job ? job.technician : 'N/A'}`,
          `Estimated Amount: ${job ? job.amount : 'N/A'}`,
          `Deadline: ${job ? job.deadline : 'N/A'}`,
          `Status: ${job ? job.status : 'N/A'}`,
        ];
    
        details.forEach((line, index) => {
          pdf.text(line, 20, 40 + index * 10);
        });
    
        // Save the PDF
        pdf.save("job_sheet.pdf");
      };
      
      
      // Function to go back to homepage
      const handleCancel = () => {
        navigate('/');  
    };

    //delete function
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


    // Function to handle adding a new note
    const handleAddNote = () => {
        if (newNote.trim() !== "") {
            setNotes([...notes, newNote]);  
            toast.success("Note added successfully!");
            setNewNote("");                 
        }
    };

  return (
    <>
    <div className="container">
        <div className="row justify-content-center mt-4 mb-4">
            <div className="col-md-8">
                <div className="card">
                    <div>
                        <h3 className="text-light text-center mt-3 mb-2 pt-2 pb-2 fs-4 ms-3 me-3 rounded-top-1" style={{backgroundColor:"#004080"}}>VIEW JOB SHEET</h3>          
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th className="text-light" style={{backgroundColor:"#004080"}}>Client Name:</th>
                                        <td>{job?.name}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-light" style={{backgroundColor:"#004080"}}>Contact Info:</th>
                                        <td>{job?.phone}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-light" style={{backgroundColor:"#004080"}}>Received Date:</th>
                                        <td>{job?.date}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-light" style={{backgroundColor:"#004080"}}>Inventory Received:</th>
                                        <td>{job?.inventory}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-light" style={{backgroundColor:"#004080"}}>Inventory Image/Document/Video:</th>
                                        <td>{job?.image}
                                        <img src={BASE_URL + job?.image} alt="Image" style={{ maxHeight: "60px" }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="text-light" style={{backgroundColor:"#004080"}}>Reported Issues:</th>
                                            <td>{job?.report}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-light" style={{backgroundColor:"#004080"}}>Client Notes:</th>
                                        <td>{job?.notes}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-light" style={{backgroundColor:"#004080"}}>Assigned Technician:</th>
                                        <td>{job?.technician}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-light" style={{backgroundColor:"#004080"}}>Estimated Amount:</th>
                                        <td>{job?.amount}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-light" style={{backgroundColor:"#004080"}}>Deadline:</th>
                                        <td>{job?.deadline}</td>
                                    </tr>
                                    <tr>
                                        <th className="text-light" style={{backgroundColor:"#004080"}}>Status:</th>
                                        <td>{job?.status}</td>
                                    </tr>
                                   
                                    </tbody>
                                </table>
                            </div>

                            <div className="form-group mb-3 ms-3 me-3">
                                <label htmlFor="notes" className="form-label">Add or Update Note:</label>
                                <textarea className="form-control" id="notes" rows="3" value={newNote} onChange={(e)=>{setNewNote(e.target.value)}} ></textarea>
                            
                                <button className="btn col-md-12 mt-3 text-white" onClick={handleAddNote} style={{backgroundColor:"#004080", borderRadius: "4px"}}>
                                    Save Note
                                </button>

                            
                            <div className="fw-bold mt-2"><Link to={"/edit/"+ id} style={{color:"#004080", textDecoration: "none"}}>Edit 
                            </Link>
                              <span onClick={()=>{deleteData(id)}} style={{ cursor: 'pointer'}}> <Link to={"/delete/"+ id} style={{color:"#004080", textDecoration: "none" }}></Link>Delete</span>
                            </div>
                           
                            

                            <div className="text-center fw-bold mt-4 " style={{color:"#004080", cursor: 'pointer'}} onClick={handleCancel}>Back</div>
                            <button type="button" onClick={handleDownloadPdf}>
                                Save as PDF</button>
                            </div>
                                                                     
                        </div>
                    </div>
                </div>
            </div>
   
    </>
  )
}
