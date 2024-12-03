import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-properties',
  templateUrl: './form-properties.component.html',
  styleUrl: './form-properties.component.scss'
})
export class FormPropertiesComponent {
  /**
   * Initization
   */
  @Input() properties?: any;
  @Input() listingForm!: FormGroup;

  ngOnChanges(changes: any) {
    if (this.properties) {
      this.editListingForm();
    }
  }

  /**
    * Edit listing form method
    */
  editListingForm() {
    this.listingForm.reset();
    this.listingForm?.patchValue({
      inputId: this.properties?.inputId,
      name: this.properties?.name,
      placeholder: this.properties?.placeholder,
      type: this.properties?.type,
      label: this.properties?.label,
      description: this.properties?.description,
      isActive: this.properties?.isActive,
      listingWidth: this.properties?.listingWidth,
      tag: this.properties?.tag,
      controlName: this.properties?.controlName
    });
    
    this.getFormValidations?.patchValue({
      fieldRequired: this.properties?.formValidations?.fieldRequired,
      minimum: this.properties?.formValidations?.minimum || '',
      maximum: this.properties?.formValidations?.maximum || '',
      regex: this.properties?.formValidations?.regex || '',
    });
  }

    /**
   * Method to get the formValidations form
   */
    get getFormValidations() {
      return this.listingForm.get('formValidations') as FormGroup;
    }
}
