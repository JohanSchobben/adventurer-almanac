import {Component, inject, signal, Signal} from '@angular/core';
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
  editMode = signal(false);

  constructor() {
    this.adventures = toSignal(this.service.getAdventures())

  }

  createNewAdventure(name: string) {
    this.service.createAdventure(name)
      .subscribe({
        next:() => {
          this.editMode.set(false);
        }
      })
  }

  deleteAdventure(adv: Adventure) {
    console.log("hier");
    this.service.deleteAdventure(adv.id).subscribe({
      next: (a) => console.log(a),
      error: (e) => console.log(e),
      complete: ()=> console.log("done")
    })
  }

  changeMode(): void {
    this.editMode.set(true);
  }
}
