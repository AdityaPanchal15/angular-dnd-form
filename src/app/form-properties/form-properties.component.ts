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
  @Input() listingForm?: FormGroup;

  ngOnChanges(changes: any) {
    if (this.properties) {
      this.editListingForm();
    }
  }

  /**
    * Edit listing form method
    */
  editListingForm() {
    this.listingForm?.patchValue({
      inputId: this.properties?.inputId,
      name: this.properties?.name,
      placeholder: this.properties?.placeholder,
      type: this.properties?.type,
      label: this.properties?.label,
      description: this.properties?.description,
      isActive: this.properties?.isActive,
      listingWidth: this.properties?.listingWidth,
      tag: this.properties?.tag
    });
  }
}
