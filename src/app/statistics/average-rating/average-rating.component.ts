import { Component, OnInit } from '@angular/core';
import {
  AverageRatingStatistics,
  getAverageStatistics,
} from '../reducers/statistics.reducer';
import { select, Store } from '@ngrx/store';
import { loadAverageRating } from '../actions/statistics.action';
import {
  axisBottom,
  axisLeft,
  scaleBand,
  scaleLinear,
  select as d3Select,
} from 'd3';
import { skip, take } from 'rxjs/operators';

@Component({
  selector: 'app-average-rating',
  templateUrl: './average-rating.component.html',
  styleUrls: ['./average-rating.component.scss'],
})
export class AverageRatingComponent implements OnInit {
  private svg;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  constructor(private store: Store<AverageRatingStatistics>) {
    this.store.dispatch(loadAverageRating());
  }

  ngOnInit(): void {
    this.store
      .pipe(select(getAverageStatistics), skip(1), take(1))
      .subscribe((data) => {
        this.createSvg();
        this.drawBars(data);
      });
  }

  private createSvg(): void {
    this.svg = d3Select('figure#bar-chart')
      .append('svg')
      .attr('width', this.width + this.margin * 2)
      .attr('height', this.height + this.margin * 2)
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  private drawBars(data: AverageRatingStatistics): void {
    // Create the X-axis band scale
    const x = scaleBand()
      .range([0, this.width])
      .domain(Object.keys(data))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Create the Y-axis band scale
    const y = scaleLinear().domain([1, 5]).range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append('g').call(axisLeft(y));

    // Create and fill the bars
    this.svg
      .selectAll('bars')
      .data(Object.keys(data))
      .enter()
      .append('rect')
      .attr('x', (d) => x(d))
      .attr('y', (d) => y(data[d]))
      .attr('width', x.bandwidth())
      .attr('height', (d) => this.height - y(data[d]))
      .attr('fill', '#d04a35');
  }
}
