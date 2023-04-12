import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {

  listOfTask: any = [];
  errorsInApi : boolean = false;
  $unsubscribe = new Subject();

  constructor( private httpData : DataserviceService) { }
  

  ngOnInit(): void {
    this.getAllData()
  }

  getAllData(){
    this.errorsInApi = false;
    this.httpData.getAllData().pipe(takeUntil(this.$unsubscribe)).subscribe(
      {
        next : ((data) => {
          this.listOfTask = data;
        }),
        error : ((_error : any)=>{
          this.errorsInApi = true
        })
      }
    )
  }

  onClicked(data : any){
  
    let completedStatus = this.listOfTask[data.id - 1];
    completedStatus.completed = !completedStatus.completed ? true : false;

  }

  ngOnDestroy(){
    this.$unsubscribe.next('');
    this.$unsubscribe.complete();
  }
}
