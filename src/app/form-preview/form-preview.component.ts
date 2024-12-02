import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrl: './form-preview.component.scss'
})
export class FormPreviewComponent {
  @Input() formData: any;
  @Output() formPreviewModal: EventEmitter<any> = new EventEmitter();
 
  closeModalPopup() {
    this.formPreviewModal.emit();
  }
}
