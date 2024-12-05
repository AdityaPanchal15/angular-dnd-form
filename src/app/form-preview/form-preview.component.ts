import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrl: './form-preview.component.scss'
})
export class FormPreviewComponent {
  formData: any;
  @Output() formPreviewModal: EventEmitter<any> = new EventEmitter();
  previewForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,) {}

  ngOnInit() {
    this.createPreviewForm();
  }

  createPreviewForm() {
    // Initialize the form group
    const formGroup: any = {};

    // Iterate through sections to dynamically create form controls
    this.formData.forEach((section: any) => {
      section.inputFields.forEach((field: any) => {
        // Build validators for each field
        const validators = [];
        if (field.formValidations?.fieldRequired) {
          validators.push(Validators.required);
        }
        if (field.formValidations?.minimum) {
          validators.push(Validators.minLength(parseInt(field.formValidations.minimum)));
        }
        if (field.formValidations?.maximum) {
          validators.push(Validators.maxLength(parseInt(field.formValidations.maximum)));
        }

        // Add control to formGroup
        formGroup[field.controlName] = ['', validators]; // Set default value as empty
      });
    });

    this.previewForm = this.formBuilder.group(formGroup);
  }

  closeModalPopup() {
    this.formPreviewModal.emit();
  }
}
