import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useParams, useNavigate } from "react-router-dom";
import ApiServices, { BASE_URL } from "./ApiServices";

export default function EditJob() {
    const param = useParams();
    const id = param.id;
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [date,setDate] = useState("");
    const [inventory, setInventory] = useState("");
    const [image, setImage] = useState({});
    const [imageName, setImageName] = useState("");
    const [previousImage,setPreviousImage]=useState("")
    const [report,setReport] = useState("");
    const [notes,setNotes] = useState("");
    const [technician,setTechnician] = useState("");
    const [deadline,setDeadline] = useState("");
    const [amount,setAmount] = useState("");
    const [status, setStatus] = useState("");

    
    useEffect(() => {
        let data={
            _id:id
        }
        
        ApiServices.singleJob(data).then((res) => {
          //  console.log(res);
                setName(res.data.data.name);
                setPhone(res.data.data.phone)
                setDate(res.data.data.date);
                setInventory(res.data.data.inventory);
                setReport(res.data.data.report)
                setNotes(res.data.data.notes)
                setTechnician(res.data.data.technician)
                setDeadline(res.data.data.deadline)
                setAmount(res.data.data.amount)
                setStatus(res.data.data.status)
                setPreviousImage(res.data.data.image);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [id]);


    const changeImage = (e) => {
        setImageName(e.target.value);
        setImage(e.target.files[0]);
    };


    const handleForm = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append("_id",id)
        data.append("name", name);
        data.append("phone", phone);
        data.append("date", date);
        data.append("inventory", inventory);
        data.append("image", image);
        data.append("report", report);
        data.append("notes", notes);
        data.append("technician", technician);
        data.append("deadline", deadline);
        data.append("amount", amount);
        data.append("status", status);


        ApiServices.updateJob(data)
        .then((res) => {
            toast.success(res.data.message);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleCancel = () => {
        navigate('/');  
    };

  return (
    <>
    <div className="container-fluid" style={{ backgroundColor: "#f0f0f0" }}>
    <div className="row p-4">
        <form method="post" onSubmit={handleForm} className="p-3 mt-2 mx-auto bg-white rounded" style={{ maxWidth: 590 }}>
            <div className='text-light text-center mt-1 mb-2 pt-2 pb-2 rounded-top-1' style={{backgroundColor:"#004080"}}>EDIT JOB SHEET</div>
            <div className="row g-3">
            <div className="col-md-12" style={{  maxHeight: '600px', overflowY: 'auto' }}>
                <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">Client Name</label>
                <input type="text" className="form-control" id="name" value={name}
                onChange={(e)=>{setName(e.target.value)}} />
                </div>

                <div className="form-group mb-3">
                <label htmlFor="phone" className="form-label">Contact Info (Phone 10nos):</label>
                <input type="text" className="form-control" id="phone" value={phone} maxLength={10} onChange={(e)=>{setPhone(e.target.value)}} />
                </div>

                <div className="form-group mb-3">
                <label htmlFor="date" className="form-label">Received Date:</label>
                <input type="date" className="form-control" id="date" placeholder="dd - mm - yyyy" 
                value={date} onChange={(e)=>{setDate(e.target.value)}}
                 />
                </div>

                <div className="form-group mb-3">
                <label htmlFor="inventory" className="form-label">Inventory Received:</label>
                <input type="text" className="form-control" id="inventory" value={inventory} onChange={(e)=>{setInventory(e.target.value)}} />
                </div>

                <div className="form-group mb-3">
                <label htmlFor="formFile" className="form-label">Upload Inventory Image/Document/Video:</label><br/>
                <img src={BASE_URL+previousImage} style={{height:"80px",width:"80px"}}/>
                <input type="file" className="form-control" id="formFile" value={imageName}
                    onChange={changeImage} />
                </div>

                <div className="form-group mb-3">
                <label htmlFor="report" className="form-label">Reported Issues:</label>
                <textarea className="form-control" id="report" rows="3" value={report} onChange={(e)=>{setReport(e.target.value)}} ></textarea>
                </div>

                <div className="form-group mb-3">
                <label htmlFor="notes" className="form-label">Client Notes:</label>
                <textarea className="form-control" id="notes" rows="3" value={notes} onChange={(e)=>{setNotes(e.target.value)}} ></textarea>
                </div>

                <div className="form-group mb-3">
                <label htmlFor="technician" className="form-label">Assigned Technician:</label>
                <input type="text" className="form-control" id="technician" value={technician} onChange={(e)=>{setTechnician(e.target.value)}} />
                </div>

                <div className="form-group mb-3">
                <label htmlFor="deadline" className="form-label">Deadline:</label>
                <input type="date" className="form-control" id="deadline" placeholder="dd - mm - yyyy"
                value={deadline} onChange={(e)=>{setDeadline(e.target.value)}}                
                />
                </div>

                <div className="form-group mb-3">
                <label htmlFor="amount" className="form-label">Estimated Amount:</label>
                <input type="text" className="form-control" id="amount" value={amount} 
                onChange={(e)=>{setAmount(e.target.value)}} />
                </div>

                <div className="form-group mb-3">
                <label htmlFor="status" className="form-label">Status:</label>
                <select className="form-select" aria-label="Default select example" id='status' value={status} onChange={(e)=>{setStatus(e.target.value)}}>
                  <option value="" disabled>Select</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>

                </select>
                </div>
                
                <button type="submit" className="col-md-12 mt-3 btn-sm d-6 btn rounded text-white" style={{backgroundColor:"#004080"}}>Save Changes</button>
                <div className="text-center fw-bold fs-7 mt-3" style={{color:"#004080", cursor: 'pointer'}} onClick={handleCancel}>Cancel</div>
            </div>
        
            </div>
        </form>
    </div>
    </div>

    </>
  )
}
