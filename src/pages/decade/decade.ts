import {Component, ViewChild, OnDestroy} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SharedProvider} from "../../providers/shared/shared";
import {Chart} from 'Chart.js';
import {Subscription} from "rxjs/Subscription";

/**
 * Generated class for the DecadePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-decade',
  templateUrl: 'decade.html',
})
export class DecadePage implements OnDestroy {
  @ViewChild('graph') graph;
  doughnutChart: any;

  private chartData: number[] = [];
  private chartLabels: any[] = [];

  public movies: Array<Object>;
  moviesSubscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, public shared: SharedProvider) {
    this.moviesSubscription = this.shared.movies$.subscribe(res => {
      this.movies = res;
      this.prepareChartData();
    })
  }

  ionViewDidLoad() {
    this.doughnutChart = new Chart(this.graph.nativeElement, {

      type: 'pie',
      data: {
        labels: this.chartLabels,
        datasets: [{
          data: this.chartData,
          backgroundColor: [
            'rgba(44, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(90, 120, 164, 0.2)'
          ],
        }]
      }
    });
  }

  prepareChartData() {
    this.movies.forEach(item => {
      let decade = (Math.floor(item['year'] / 10)) + '0-' + (Math.floor(item['year'] / 10)) + '9';
      let position = this.chartLabels.indexOf(decade);
      if (position === -1) {
        this.chartLabels.push(decade);
        this.chartData[this.chartLabels.indexOf(decade)] = 1;
      }
      else {
        this.chartData[position] += 1;
      }
    });
  }

  ngOnDestroy() {
    this.moviesSubscription.unsubscribe();
  }
}
