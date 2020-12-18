import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MDBModalService, MdbTableDirective} from 'angular-bootstrap-md';
import {Review} from '../entity/review.interface';

@Component({
  selector: 'app-reviews-table',
  templateUrl: './reviews-table.component.html',
  styleUrls: ['./reviews-table.component.scss']
})
export class ReviewsTableComponent implements OnInit {
  @ViewChild(MdbTableDirective, {static: true}) reviewTable: MdbTableDirective;
  headElements = ['User First Name', 'User Last Name', 'Restaurant', 'Review', 'Delete'];
  reviews: Review[] = [{content: 'ddfdffsf lksdklfkhkdhsjkfh ksjhfksjhfjskhsjkfhskfskfkjdhskjfh skfjhsjkdfsjkf skfjskfjkdsjfhskdjf sfhskjfhs kfjsh sdksldfs;ldfs fs;kfsdfks;dlfk;lfksd flksfl;skd ks', creationDate: new Date(), id: 1,
    user: {address: {houseNumber: 1, street: 'asd', city: 'sfa'}, firstName: 'lilach', lastName: 'f', email: 'd'},
    restaurant: {address: {houseNumber: 1, street: 'asd', city: 'sfa'}, description: 'good', imageUrl: 'asdadas', name: 'fun', rating: 1,
      category: {description: 'asdas', name: 'sd'}}},
    {content: 'dks', creationDate: new Date(), id: 1,
      user: {address: {houseNumber: 1, street: 'asd', city: 'sfa'}, firstName: 'lilach', lastName: 'f', email: 'd'},
      restaurant: {address: {houseNumber: 1, street: 'asd', city: 'sfa'}, description: 'good', imageUrl: 'asdadas', name: 'fun', rating: 1,
        category: {description: 'asdas', name: 'sd'}}},
    {content: 'dks', creationDate: new Date(), id: 1,
      user: {address: {houseNumber: 1, street: 'asd', city: 'sfa'}, firstName: 'lilach', lastName: 'f', email: 'd'},
      restaurant: {address: {houseNumber: 1, street: 'asd', city: 'sfa'}, description: 'good', imageUrl: 'asdadas', name: 'fun', rating: 1,
        category: {description: 'asdas', name: 'sd'}}}];
  searchText = '';
  previous: string;

  constructor(private modalService: MDBModalService) {
  }

  @HostListener('input') oninput(): void {
    this.searchItems();
  }

  ngOnInit(): void {
    this.reviewTable.setDataSource(this.reviews);
    this.previous = this.reviewTable.getDataSource();
  }

  searchItems(): void {
    const previous = this.reviewTable.getDataSource();
    if (!this.searchText) {
      this.reviewTable.setDataSource(this.previous);
      this.reviews = this.reviewTable.getDataSource();
    }
    if (this.searchText) {
      this.reviews = this.reviewTable.searchLocalDataBy(this.searchText);
      this.reviewTable.setDataSource(previous);
    }
  }
}
