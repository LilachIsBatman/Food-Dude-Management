import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  getRestaurantShareStatistics,
  RestaurantShareStatistics,
  StatisticsState,
} from '../reducers/statistics.reducer';
import { loadRestaurantShare } from '../actions/statistics.action';

import { arc, pie, scaleOrdinal, select as d3Select } from 'd3';
import { skip, take } from 'rxjs/operators';

@Component({
  selector: 'app-restaurant-share',
  templateUrl: './restaurant-share.component.html',
  styleUrls: ['./restaurant-share.component.scss'],
})
export class RestaurantShareComponent implements OnInit {
  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  constructor(private store: Store<StatisticsState>) {
    this.store.dispatch(loadRestaurantShare());
  }

  ngOnInit(): void {
    this.store
      .pipe(select(getRestaurantShareStatistics), skip(1), take(1))
      .subscribe((data) => {
        this.createSvg();
        this.createColors(data);
        this.drawChart(data);
      });
  }

  private createSvg(): void {
    this.svg = d3Select('figure#pie-chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private createColors(data: RestaurantShareStatistics): void {
    this.colors = scaleOrdinal()
      .domain(Object.values(data).map((d) => d.amount.toString()))
      .range(['#c7d3ec', '#a5b8db', '#879cc4', '#677795', '#5a6782']);
  }

  private drawChart(data: RestaurantShareStatistics): void {
    // Compute the position of each group on the pie:
    const pieData = pie<{ amount: number; percentage: number }>().value((d) =>
      Number(d.percentage)
    );

    // Build the pie chart
    this.svg
      .selectAll('pieces')
      .data(pieData(Object.values(data)))
      .enter()
      .append('path')
      .attr('d', arc().innerRadius(0).outerRadius(this.radius))
      .attr('fill', (d, i) => this.colors(i))
      .attr('stroke', '#121926')
      .style('stroke-width', '1px');

    // Add labels
    const labelLocation = arc().innerRadius(100).outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pieData(Object.values(data)))
      .enter()
      .append('text')
      .text((d: { data: { amount: number; percentage: number } }) =>
        d.data.amount.toString()
      )
      .attr('transform', (d) => 'translate(' + labelLocation.centroid(d) + ')')
      .style('text-anchor', 'middle')
      .style('font-size', 15);
  }
}
