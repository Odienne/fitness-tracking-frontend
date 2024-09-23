import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const BASE_URL = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  postActivity(activityDto: any): Observable<any> {
    return this.http.post(`${BASE_URL}/activity`, activityDto);
  }

  getActivities(): Observable<any> {
    return this.http.get(`${BASE_URL}/activities`);
  }

  postWorkout(workoutDTO: any): Observable<any> {
    return this.http.post(`${BASE_URL}/workout`, workoutDTO);
  }

  getWorkouts(): Observable<any> {
    return this.http.get(`${BASE_URL}/workouts`);
  }

  postGoal(goalDTO: any) {
    return this.http.post(`${BASE_URL}/goal`, goalDTO);
  }

  getGoals() {
    return this.http.get(`${BASE_URL}/goals`);
  }
  updateGoalStatus(id: number) {
    return this.http.patch(`${BASE_URL}/goal/status/${id}`, {})
  }

  getStats() {
    return this.http.get(`${BASE_URL}/stats`)
  }

  getGraphStats() {
    return this.http.get(`${BASE_URL}/graphs`)
  }
}

