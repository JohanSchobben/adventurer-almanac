import { Injectable } from '@angular/core';
import {IDBPDatabase, IDBPTransaction, openDB, StoreNames} from 'idb';
import {from, Observable, of, switchMap} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db!: IDBPDatabase<unknown>;

  public async setup(): Promise<void> {
    this.db = await openDB("adventurer-almanac", 1, {
      upgrade(database: IDBPDatabase<unknown>, oldVersion: number, newVersion: number | null, transaction: IDBPTransaction<unknown, StoreNames<unknown>[], "versionchange">, event: IDBVersionChangeEvent) {
        const store =database.createObjectStore("adventures", {
          keyPath: "id"
        });

        store.createIndex('date', 'date');
      }
    })
  }

  public getAll(storeName: string): Observable<any> {
    return of(undefined).pipe(
      switchMap(()=> fromPromise(this.db.getAll(storeName)))
    )
  }

  public save(store: string, item: Record<string, any>): Observable<any> {
    return of(undefined)
      .pipe(
        switchMap(() => {
          return fromPromise(this.db.add(store, item))
        })
      );
  }

  public delete(store: string, key: number | string): Observable<any> {
    return of(undefined)
      .pipe(
        switchMap(() => {
          console.log("this")
          return fromPromise(this.db.delete(store, key))
        })
      )
  }
}
