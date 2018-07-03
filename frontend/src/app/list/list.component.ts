import { IssueService } from './../issue.service';
import { Component, OnInit } from '@angular/core';
import { Issue } from '../models/issue.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'responsible',
    'severity',
    'status',
    'actions'
  ];
  dataSource: Issue[] = [];

  constructor(private service: IssueService) {}

  ngOnInit() {
    this.service.getIssues().subscribe(issues => {
      console.log(issues);
      this.dataSource = [...issues];
    });
  }
}
