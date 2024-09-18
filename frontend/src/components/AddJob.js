import { useState } from 'react'
import { toast } from "react-toastify"
import ApiServices from './ApiServices';

export default function AddJob() {
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [date,setDate] = useState("");
  const [inventory, setInventory] = useState("");
  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [report,setReport] = useState("");
  const [notes,setNotes] = useState("");
  const [technician,setTechnician] = useState("");
  const [deadline,setDeadline] = useState("");
  const [amount,setAmount] = useState("");
  const [status, setStatus] = useState("");

  
        const changeImage = (e) => {
          setImageName(e.target.value);
          setImage(e.target.files[0]);
        };

  
        const handleForm = (e) => {
          e.preventDefault();

          let data = new FormData();
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


          ApiServices.addJob(data).then((res) => {
            console.log("response is ", res);
            if(res.data.success==true){
              toast.success(res.data.message)
              setName("")
              setPhone("")
              setDate("")
              setInventory("")
              setImage({});
              setImageName("");
              setReport("")
              setNotes("")
              setTechnician("")
              setDeadline("")
              setAmount("")
              setStatus("")
            }
            else{
              toast.error(res.data.errors[0])
            }
          }).catch((err)=>{
          console.log("error is ", err);
          toast.error("something went wrong")
        })
      }

  return (
    <>
    <div className="container-fluid" style={{ backgroundColor: "#f0f0f0" }}>
    <div className="row p-4">
        <form method="post" onSubmit={handleForm} className="p-3 mt-2 mx-auto bg-white rounded" style={{ maxWidth: 590 }}>
            <div className='text-light text-center mt-1 mb-2 pt-2 pb-2 rounded-top-1' style={{backgroundColor:"#004080"}}>CREATE NEW JOB SHEET</div>
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
                <label htmlFor="formFile" className="form-label">Upload Inventory Image/Document/Video:</label>
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
                
                <button type="submit" className="col-md-12 mt-3 btn-sm d-6 btn rounded text-white" style={{backgroundColor:"#004080"}}>Save Job Sheet</button>
            </div>
        
            </div>
        </form>
    </div>
    </div>

    </>
  )
}
