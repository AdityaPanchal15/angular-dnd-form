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

    generateControlName($event: any) {
      var labelText = $event.target.value
      labelText = labelText.split(" ");
      var newStr = labelText[0].toLowerCase();
      for (var i = 1; i < labelText.length; i++) {
        newStr += labelText[i].charAt(0).toUpperCase() + labelText[i].substring(1);
      }
      this.listingForm.get('controlName')?.patchValue(newStr)
    }
}
