import {Component, ElementRef, ViewChild} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {UserService} from "../../service/user.service";
import Chart, {CategoryScale} from 'chart.js/auto';
import {DatePipe} from "@angular/common";

Chart.register(CategoryScale);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule],
  providers: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  statsData: any;

  workouts: any;
  activities: any;

  gridStyle = {
    width: "100%",
    textAlign: "center"
  }

  @ViewChild('workoutLineChart') private workoutLineChartRef: ElementRef | undefined;
  @ViewChild('activityLineChart') private activityLineChartRef: ElementRef | undefined;

  constructor(private userService: UserService,
              private datePipe: DatePipe) {
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

        if (this.workoutLineChartRef || this.activityLineChartRef) {
          this.createLineChart();
        }
      },
      error: () => {
        this.statsData = null;
      }
    })
  }


  ngAfterViewInit() {
    if (this.workouts && this.activities) {
      this.createLineChart();
    }
  }


  private createLineChart() {
    const workoutCtx = this.workoutLineChartRef?.nativeElement.getContext("2d");
    const activityCtx = this.activityLineChartRef?.nativeElement.getContext("2d");

    new Chart(workoutCtx, {
      type: 'line',
      data: {
        labels: this.workouts.map((day: any) => this.datePipe.transform(day.date, 'MM-dd')),
        datasets: [{
          label: "Calories burned",
          data: this.workouts.map((w: any) => w.caloriesBurned),
          borderWidth: 1,
          backgroundColor: 'rgba(80, 200, 120, 0.6)',
          borderColor: "rgba(0, 100, 0, 0.4)",
        },
          {
            label: "Duration",
            data: this.workouts.map((w: any) => w.duration),
            borderWidth: 1,
            backgroundColor: 'rgba(0, 20, 120, 0.6)',
            borderColor: "rgba(0, 100, 0, 0.4)",
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(activityCtx, {
      type: 'line',
      data: {
        labels: this.activities.map((day: any) => this.datePipe.transform(day.date, 'MM-dd')),
        datasets: [{
          label: "Calories burned",
          data: this.workouts.map((a: any) => a.caloriesBurned),
          borderWidth: 1,
          backgroundColor: 'rgba(80, 200, 120, 0.6)',
          borderColor: "rgba(80, 200, 120, 0.4)",
        },
          {
            label: "Distance",
            data: this.activities.map((a: any) => a.distance),
            borderWidth: 1,
            backgroundColor: 'rgba(0, 20, 120, 0.6)',
            borderColor: "rgba(0, 20, 120, 0.4)",
          },
          {
            label: "Steps",
            data: this.activities.map((a: any) => a.steps),
            borderWidth: 1,
            backgroundColor: 'rgba(100, 20, 50, 0.6)',
            borderColor: "rgba(100, 20, 50, 0.4)",
          }
        ]
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
