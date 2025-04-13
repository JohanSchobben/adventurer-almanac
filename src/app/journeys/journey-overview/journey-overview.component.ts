import {Component, inject, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap, throwError} from 'rxjs';
import {AdventureService} from '../../adventures/services/adventure.service';
import {Adventure} from '../../adventures/models/adventure';

@Component({
  selector: 'aa-journey-overview',
  imports: [],
  templateUrl: './journey-overview.component.html',
  styleUrl: './journey-overview.component.scss'
})
export class JourneyOverviewComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private adventureService = inject(AdventureService)
  protected adventure: WritableSignal<Adventure | undefined> = signal(undefined)

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const slug = params.get("slug")
          if (!slug) return throwError(() => new Error("Can't find article with Slug"))
          return this.adventureService.getAdventureBySlug(slug)
        })
      ).subscribe({
        next: (adventrue: Adventure | undefined) => {
          this.adventure.set(adventrue);
        },
        error: () => {}
    })
  }
}
