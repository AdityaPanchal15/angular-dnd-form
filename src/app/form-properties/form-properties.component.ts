import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-properties',
  templateUrl: './form-properties.component.html',
  styleUrl: './form-properties.component.scss'
})
export class FormPropertiesComponent {
  /**
     * Initization
     */
  @Output() listingFormModal: EventEmitter<any> = new EventEmitter();
  // listingForm?: FormGroup;
  @Input() properties?: any;
  @Input() listingForm?: FormGroup;

  /**
    * Constructor
    */
  constructor(private fb: FormBuilder) {
  }
  
  ngOnChanges(changes: any) {
    console.log(changes);
    if (this.properties) {
      this.editListingForm();
    }
  }

  /**
    * On init method
    */
  ngOnInit() {
    // this.createListingForm();
  }

  /**
    * Create listing form method
    */
  createListingForm() {
    // this.listingForm = this.fb.group({
    //   name: [''],
    //   label: [''],
    //   description: [''],
    //   isActive: [true],
    //   listingWidth: ['100%'],
    //   listingHeight: [null],
    //   backgroundColor: [''],
    //   textColor: [''],
    //   borderColor: [''],
    //   fontFamily: [''],
    //   fontSize: [null],
    //   padding: [''],
    //   margin: ['']
    // });
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
      listingHeight: this.properties?.listingHeight,
      backgroundColor: this.properties?.backgroundColor,
      textColor: this.properties?.textColor,
      borderColor: this.properties?.borderColor,
      fontFamily: this.properties?.fontFamily,
      fontSize: this.properties?.fontSize,
      padding: this.properties?.padding,
      margin: this.properties?.margin,
      tag: this.properties?.tag,
    });
  }

  /**
    * Submit listing form method
    */
  submitListingForm() {
    if (!this.listingForm?.valid) {
      alert('Please fill all the required fields');
    } else {
      var requestData = {
        // listingId: this.properties ? this.properties?.listingId : 0,
        inputId: this.listingForm.value.inputId,
        name: this.listingForm.value.name,
        placeholder: this.listingForm.value.placeholder,
        label: this.listingForm.value.label,
        type: this.listingForm.value.type,
        description: this.listingForm.value.description,
        isActive: this.listingForm.value.isActive,
        listingWidth: this.listingForm.value.listingWidth,
        listingHeight: this.listingForm.value.listingHeight,
        backgroundColor: this.listingForm.value.backgroundColor,
        textColor: this.listingForm.value.textColor,
        borderColor: this.listingForm.value.borderColor,
        fontFamily: this.listingForm.value.fontFamily,
        fontSize: this.listingForm.value.fontSize,
        padding: this.listingForm.value.padding,
        margin: this.listingForm.value.margin,
        tag: this.listingForm.value.tag
      };
      // After successfully save the response get again the listing data and update the form
      if (true) {
        console.log("Listing Form: ", this.listingForm.value);
        this.listingFormModal.emit(requestData);
        alert('Listing saved successfully')
      }
    }
  }

  /**
    * Close modal popup method
    */
  closeModalPopup() {
    this.listingFormModal.emit();
  }
}
