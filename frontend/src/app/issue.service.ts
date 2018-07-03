import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

import { Issue, AddIssue } from './models/issue.model';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  constructor(private http: HttpClient) {}

  getIssues() {
    return this.http.get<Issue[]>(`${environment.url}/issues`);
  }

  getIssueById(id: string) {
    return this.http.get<Issue>(`${environment.url}/issues/${id}`);
  }

  addIssue(addIssue: AddIssue) {
    return this.http.post<AddIssue>(`${environment.url}/issues/add`, addIssue);
  }

  updateIssue(issue: Issue) {
    return this.http.post<Issue>(
      `${environment.url}/issues/update/${issue.id}`,
      issue
    );
  }

  deleteIssue(id: string) {
    return this.http.delete(`${environment.url}/issues/delete/${id}`);
  }
}
