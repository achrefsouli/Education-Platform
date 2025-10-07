import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UserService } from 'src/app/services/user.service';

Chart.register(...registerables);
@Component({
  selector: 'app-admin-chart',
  templateUrl: './admin-chart.component.html',
  styleUrls: ['./admin-chart.component.css'],
 
})

export class AdminChartComponent implements OnInit {
teachers:any=[];
students:any=[];
parents:any=[];  
constructor(private userService : UserService) { }

  ngOnInit(){
    this.userService.getAllTeachers().subscribe(
      (data)=>{
        console.log("here is response from BE after getting all users",data);
        this.teachers=data.tab;
       
      }
    )
    this.userService.getAllParents().subscribe(
      (data)=>{
        console.log("here is response from BE after getting all users",data);
        this.parents=data.tab;
        
      }
    )
    this.userService.getAllStudents().subscribe(
      (data)=>{
        console.log("here is response from BE after getting all users",data);
        this.students=data.tab;
        this.renderChart()
      }
    )
    
  }
  renderChart(){
  new Chart("chart", {
    type: 'bar',
    data: {
      labels: ['Teachers', 'Students', 'Parents'],
      datasets: [{
        label: '# of Users',
        data: [this.teachers.length, this.students.length, this.parents.length],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  }
}
