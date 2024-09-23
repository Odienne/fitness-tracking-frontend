import {Component} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent {

  gridStyle = {
    width: "100%",
    textAlign: "center"
  }

  goalForm!: FormGroup;

  goals: any;

  constructor(private fb: FormBuilder, private userService: UserService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.goalForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]]
    })

    this.getAllGoals();
  }

  submitForm() {
    this.userService.postGoal(this.goalForm.value).subscribe({
      next: () => {
        this.message.create('success', 'Goal created');
        this.goalForm.reset();
        this.getAllGoals();
      },
      error: () => {
        this.message.create('error', 'Goal not created, an error occured');
      }
    })
  }

  getAllGoals() {
    this.userService.getGoals().subscribe({
      next: (res) => {
        this.goals = res;
      },
      error: () => {
        this.message.create('error', 'Goals are unavailable, an error occured');
      }
    })
  }

  updateStatus(id: number) {
    this.userService.updateGoalStatus(id).subscribe({
      next: () => {
        this.message.create('success', 'Status updated');
        this.getAllGoals();
      },
      error: () => {
        this.message.create('error', 'Status not updated, an error occured');
      }
    })
  }
}
