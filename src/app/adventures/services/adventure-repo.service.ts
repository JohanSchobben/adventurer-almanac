import {inject, Injectable} from '@angular/core';
import {DatabaseService} from '../../services/database.service';
import {Adventure} from '../models/adventure';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdventureRepoService {
  private database = inject(DatabaseService);
  private storeName = "adventures";

  public getAll(): Observable<Adventure[]> {
    return this.database.getAll(this.storeName)
      .pipe(
        map(items => items.map((item: any) => new Adventure(item.id, item.name, item.date)))
      )
  }

  public saveAdventure(adventure: Adventure): Observable<Adventure> {
    return this.database.save(this.storeName, adventure.toObject())
      .pipe(
        map((data) => new Adventure(data.id, data.name, data.date))
      )
  }

  public deleteAdventure(id: string): Observable<void> {
    return this.database.delete(this.storeName, id)
  }
}
