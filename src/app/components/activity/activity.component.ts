import {Component} from '@angular/core';
import {NzRowDirective} from "ng-zorro-antd/grid";
import {SharedModule} from "../../shared/shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {

  gridStyle = {
    width: "100%",
    textAlign: "center"
  }

  activityForm!: FormGroup;

  activities: any;

  constructor(private fb: FormBuilder, private userService: UserService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.activityForm = this.fb.group({
      caloriesBurned: [null, [Validators.required]],
      steps: [null, [Validators.required]],
      distance: [null, [Validators.required]],
      date: [null, [Validators.required]],
    })

    this.getAllActivities();
  }

  submitForm() {
    this.userService.postActivity(this.activityForm.value).subscribe({
      next: () => {
        this.message.create('success', 'Activity created');
        this.activityForm.reset();
        this.getAllActivities();
      },
      error: () => {
        this.message.create('error', 'Activity not created, an error occured');
      }
    })
  }

  getAllActivities() {
    this.userService.getActivities().subscribe({
      next: (res) => {
        this.activities = res;
      },
      error: () => {
        this.message.create('error', 'Activities are unavailable, an error occured');
      }
    })
  }
}
