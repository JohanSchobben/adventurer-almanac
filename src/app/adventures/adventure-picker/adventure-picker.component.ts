import {Component, inject, Signal} from '@angular/core';
import {AdventureService} from '../services/adventure.service';
import {Adventure} from '../models/adventure';
import {toSignal} from '@angular/core/rxjs-interop';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'aa-adventure-picker',
  imports: [
    RouterLink
  ],
  templateUrl: './adventure-picker.component.html',
  styleUrl: './adventure-picker.component.scss'
})
export class AdventurePickerComponent {
  service = inject(AdventureService)
  adventures: Signal<Adventure[] | undefined>

  constructor() {
    this.adventures = toSignal(this.service.getAdventures())

  }

  createNewAdventure() {
    const name = `New story ${this.adventures()?.length ?? '1'}`;
    this.service.createAdventure(name).subscribe()
  }

  deleteAdventure(adv: Adventure) {
    console.log("hier");
    this.service.deleteAdventure(adv.id).subscribe({
      next: (a) => console.log(a),
      error: (e) => console.log(e),
      complete: ()=> console.log("done")
    })
  }
}
