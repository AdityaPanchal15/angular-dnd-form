import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrl: './form-preview.component.scss'
})
export class FormPreviewComponent {
  formData: any;
  @Output() formPreviewModal: EventEmitter<any> = new EventEmitter();
 
  closeModalPopup() {
    this.formPreviewModal.emit();
  }
}
