import { Component } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.scss'
})
export class WorkoutComponent {

  workouts!: any[];

  gridStyle = {
    width: "100%",
    textAlign: "center"
  }

  workoutForm!: FormGroup;

  listOfTypes: any[] = [
    "Cardio",
    "Strength",
    "Yoga",
    "HIIT",
    "Pilates",
    "Crossfit",
    "Dance",
    "Swimming",
    "Gym",
    "Zumba",
    "Climbing",
    "Cycling",
    "Running",
    "Boxing",
    "Martial Arts",
    "Gymnastics",
    "Walking",
    "Other"
  ]

  constructor(private fb: FormBuilder, private userService: UserService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.workoutForm = this.fb.group({
      type: [null, [Validators.required]],
      caloriesBurned: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      date: [null, [Validators.required]]
    })
    this.getAllWorkouts();
  }

  submitForm() {
    this.userService.postWorkout(this.workoutForm.value).subscribe({
      next: () => {
        this.message.create('success', 'Activity created');
        this.workoutForm.reset();
        this.getAllWorkouts();
      },
      error: () => {
        this.message.create('error', 'Activity not created, an error occured');
      }
    })
  }

  getAllWorkouts() {
    this.userService.getWorkouts().subscribe({
      next: (res) => {
        this.workouts = res;
      },
      error: () => {
        this.message.create('error', 'Workouts are unavailable, an error occured');
      }
    })
  }
}
