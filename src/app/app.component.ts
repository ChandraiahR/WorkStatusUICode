import { Component, ViewChild, OnInit } from '@angular/core';
import { WorkstatusserviceService } from './workstatusservice.service';
import {MatSort, MatTableDataSource} from '@angular/material';



import { CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'work-status-report';
  user={userName:"",password:""};
  listUsers:any;
  dataSource:any;
  
  userId = "";

  isAddOrEdit : boolean = false;
  isUserLogined : boolean=false;
  isWorkFlowShow : boolean = false;

  

  ngOnInit(){
    if(sessionStorage.getItem("userId") != undefined)
      this.isUserLogined = true;
    else
      this.isUserLogined = false;
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  @ViewChild(MatSort)sort: MatSort;

 

  constructor(private status:WorkstatusserviceService){}
  loginUser(){    
    console.log(this.user);
    this.status.loginUser(this.user).subscribe((data : any)=>{
      console.log(data);
      if(data.statusCode == 200){
        sessionStorage.setItem("userId",data.userId);
        this.userId = data.userId;
        this.isUserLogined = true;
      }else{
        alert(data.statusMessage);
      }
    },(error:any)=>{},()=>{
      console.log("Getting user login completed.")
    });
    
  }

  logOut(){
    this.isUserLogined = false;
    sessionStorage.clear();
  }

  generateReport(){
    this.status.generateReport(this.user).subscribe((data : any)=>{
      console.log(data);
      if(data.statusCode == 200){
        alert(data.statusMessage);       
      }else{
        alert(data.statusMessage);
      }
    },(error:any)=>{},()=>{
      console.log("Getting user generateReport completed.")
    });
  }

  workFlow = {"workId":"","userId":"","dateReported":"",
  "dateResolved":"","modelNo":"","serviceTag":"",
  "problemReported":"","userName":"","vertical":"","serialNumber":"",
  "solutionProvided":"","fultyPartPdid":"","newPartPpid":"","noofPartsRequested":"","reName":"",
  "partReturned":""};
 
  workFlowReset(){
    this.workFlow = {"workId":"","userId":"","dateReported":"",
    "dateResolved":"","modelNo":"","serviceTag":"",
    "problemReported":"","userName":"","vertical":"","serialNumber":"",
    "solutionProvided":"","fultyPartPdid":"","newPartPpid":"","noofPartsRequested":"","reName":"",
    "partReturned":""};
    this.workFlow.userId = sessionStorage.getItem("userId");
  }

  deviceType = ["MOUSE","HARD DISK","MOTHER BOARD", "GRAPHIC CARD","SPEAKERS","HEAT SHINK",        
  "SMPS ","FAN","RAM","KEY BOARD","DC CABLE","MONITOR","LCD","LVDS CABLE","DOCKING","DOUGHTER BOARD",   
  "PROCESSOR","PALMREST","CAMERA","LCD BAZEL","BATTERY","PROCESSOR FAN","USB CABLE","KEY BOARD FRAME",   
  "WIFI CARD","HARD DISK CABLE","ADOPTER",  "BATTERY CABLE","HARD DSIK","VGA CARD","DVD WRITER","LCD SCREEN"];
  
  location = ["MADHAPUR","MANIKONDA"];

  saveOrUpdateWorkFlowStatus(){
    console.log(this.workFlow);
    this.listUsers=[];
    this.status.saveOrUpdateWorkStatusInfo(this.workFlow).subscribe((data:any) => {
      console.log("Success response : "+JSON.stringify(data));
      if(data.statusCode == 200 ){
        alert("Saved the record. work Id : "+data.workId);
        this.workFlowReset();
      }else
      alert("Failed while saving the record.");
    },(error : any ) =>{
      console.log("Failed while saving the record.",error);
    },() => {
      console.log("saveOrUpdateWorkFlowStatus is completed.")
    });

  }

  updateObject(obj){
    console.log(obj);
    this.workFlow = obj;   
    this.isAddOrEdit =true; 
    this.isWorkFlowShow = false;
  }


  addNewWorkStatus(){
    console.log(this.workFlow);
    this.isAddOrEdit =true; 
    this.isWorkFlowShow = false;
    this.workFlow.userId = sessionStorage.getItem("userId");
  }

  viewAllWorkStatus(){
    this.isAddOrEdit =false;
    this.isWorkFlowShow =true;
    this.status.getWorkStatusInfo(this.user).subscribe(
      (data : any )=> {
        console.log("Success response : "+JSON.stringify(data));
        this.listUsers = data;
        this.dataSource = new MatTableDataSource(this.listUsers);
        this.dataSource.sort = this.sort;
      },
      (error : any )=> {
       console.log("Error response : "+error);
             },
      ( )=> {
        console.log("Calling Get users is completed.");
      }
    );
  }
  
}
