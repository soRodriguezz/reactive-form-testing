import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public formParent: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initFormParent();
  }

  private initFormParent(): void {
    this.formParent = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      skills: new FormArray([], [Validators.required])
    })
  }

  initFormSkill(): FormGroup {
    return new FormGroup(
      {
        language: new FormControl(''),
        projectURL: new FormControl(''),
        expYear: new FormControl('', [Validators.required])
      }
    )
  }

  addSkill(): void {
    const refSkills = this.formParent.get('skills') as FormArray;
    refSkills.push(this.initFormSkill());
  }


  // NOTE: Obtener referencia a un formControl
  getCtrl(key: string, form: FormGroup): any {
    return form.get(key);
  }

  // NOTE: Quitar validaciones
  removeValidation(index: number, key: string): void {
    const refParent = this.formParent.get('skills') as FormArray;
    const refSingle = refParent.at(index).get(key) as FormGroup;
    refSingle.clearValidators();
    refSingle.updateValueAndValidity();
  }

  // NOTE: Agregar validaciones
  addValidation(index: number, key: string): void {
    const refParent = this.formParent.get('skills') as FormArray;
    const refSingle = refParent.at(index).get(key) as FormGroup;

    refSingle.setValidators([
      Validators.required
    ])
    refSingle.updateValueAndValidity();
  }

}
