import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, shareReplay, switchMap, tap} from 'rxjs';
import {Adventure} from '../models/adventure';
import {AdventureRepoService} from './adventure-repo.service';

@Injectable({
  providedIn: 'root'
})
export class AdventureService {
  private adventures = new BehaviorSubject<Adventure[]>([]);
  private repo = inject(AdventureRepoService)
  private adventures$ = this.repo.getAll()
    .pipe(
      tap((advs) => {
        this.adventures.next(advs)
      }),
      switchMap(()=> this.adventures.asObservable()),
      shareReplay(1)
    )

  private getUuid(): string {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

  public getAdventures(): Observable<Adventure[]> {
    return this.adventures$
  }

  public getAdventureBySlug(slug: string): Observable<Adventure | undefined> {
    return this.adventures.asObservable()
      .pipe(
        map(adventures => adventures.find(a => a.slug === slug))
      );
  }

  public createAdventure(name: string): Observable<Adventure> {
    const adventure = new Adventure(this.getUuid(), name, new Date());
    return this.repo.saveAdventure(adventure)
      .pipe(
        tap(() => {
          this.adventures.next([
            ...this.adventures.getValue(),
            adventure
          ]);
        })
      );
  }

  deleteAdventure(id: string) {
    return this.repo.deleteAdventure(id)
      .pipe(
        tap(() => {
          const advs = this.adventures.getValue()
          const updated = advs.filter(a => a.id !== id);
          this.adventures.next(updated)
        })
      )
  }
}
