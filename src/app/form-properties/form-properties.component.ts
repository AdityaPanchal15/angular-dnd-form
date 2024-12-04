import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

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
  
  constructor(private fb: FormBuilder) {}

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
      isMultiSelect: this.properties?.isMultiSelect,
      hasRange: this.properties?.hasRange,
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
    
    this.getOptions.clear(); // Clear existing form groups if necessary
    
    this.properties.options?.forEach((option: any) => {
      this.getOptions.push(
        this.fb.group({
          id: option.id,
          label: option.label,
          value: option.value,
        })
      );
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

  /**
   * Method to get options for checkbox/radio group
   */
  get getOptions(): FormArray {
    return this.listingForm.get('options') as FormArray;
  }

  /**
   * Remove option from checkbox/radio group
   * @param index 
   */
  removeOption(index: number) {
    this.getOptions.removeAt(index);
  }
  
  onTypeChange() {
    if(this.listingForm.value.type === 'email') {
      this.getFormValidations.patchValue({
        regex: '/^(?![-_.])([a-zA-Z0-9]+[._%+-]?)+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/'
      })
    } else if(this.listingForm.value.type === 'number') {
      this.getFormValidations.patchValue({
        regex: '^[0-9]+$'
      })
    } else {
      this.getFormValidations.patchValue({
        regex: ''
      })
    }
  }
}
