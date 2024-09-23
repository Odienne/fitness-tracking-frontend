import {Component} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  statsData: any;

  workouts: any;
  activities: any;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getStats();
    this.getGraphStats();
  }

  getStats() {
    this.userService.getStats().subscribe({
      next: (res) => {
        this.statsData = res;
      },
      error: () => {
        this.statsData = null;
      }
    })
  }

  getGraphStats() {
    this.userService.getGraphStats().subscribe({
      next: (res: any) => {
        this.workouts = res?.workouts;
        this.activities = res?.activities;
      },
      error: () => {
        this.statsData = null;
      }
    })
  }

  gridStyle = {
    width: "100%",
    textAlign: "center"
  }
}
