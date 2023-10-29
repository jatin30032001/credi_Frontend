import React,{useState} from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const TablePage = () => {
  
  const [data,setData]=useState();

  useState( async ()=>{
    try{
      const response = await axios.get(`https://credi-backend-fqtk-6h456mqk3-jrsaini2090-gmailcom.vercel.app/get`);
      setData(response.data.data);
      }catch(err){
        console.log(err);
    } 
  },[])

  const column = [
    {
        field: 'id',
        headerName: 'ID',
        minWidth: 100,
        flex: 0.5
    },
    {
        field: 'UEN',
        headerName: 'UEN',
        minWidth: 100,
        flex: 0.5
    },
    {
        field: 'CompanyName',
        headerName: 'CompanyName',
        minWidth: 100,
        flex: 0.5
    },
    {
        field: 'Name',
        headerName: 'Name',
        minWidth: 100,
        flex: 0.5
    },
    {
        field: 'Position',
        headerName: 'Position',
        minWidth: 100,
        flex: 0.5
    },
    {
        field: 'Email',
        headerName: 'Email',
        minWidth: 100,
        flex: 0.5
    },
    {
        field: 'Mobile',
        headerName: 'Mobile',
        minWidth: 100,
        flex: 0.5
    }
  ]

  const row = [];


  data && data.forEach((element,ind) => {
    row.push({
        id: ind+1,
        UEN: element.uen,
        CompanyName: element.cname,
        Name: element.name,
        Position: element.position,
        Email:element.email,
        Mobile:element.mobile 
    });
  });

  return (
    <div className="table">
      <Navbar/>
      <div style={{"width":"80%","margin":"auto","marginTop":"70px"}}>
      <DataGrid
        rows={row}
        columns={column}
        pageSize={6}
        autoHeight
        disableSelectionOnClick
      ></DataGrid>
      </div>     
      <Footer/>
    </div>
  );
};

export default TablePage;
