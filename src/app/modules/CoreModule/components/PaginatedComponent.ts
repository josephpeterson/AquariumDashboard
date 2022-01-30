import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { PaginationSliver } from 'src/app/models/PaginationSliver';

export class PaginatedComponent {
  public pagination: PaginationSliver = new PaginationSliver();
  public faCaretLeft = faCaretLeft;
  public faCaretRight = faCaretRight;

  public loadForward() {
    var add = 5;
    var max = 5;
    this.pagination.count += add;
    if (this.pagination.count > max) {
      this.pagination.start += this.pagination.count - max;
      this.pagination.count = max;
    }
    //this.loadATOHistory();
  }
  public loadBackward() {
    var sub = 5;
    this.pagination.start -= sub;
    if (this.pagination.start < 0)
      this.pagination.start = 0;
    //this.loadATOHistory();
  }
  public getPageNumber() {
    var perPage = 5;
    var current = this.pagination.start;
    return 1 + current / perPage;
  }
}
