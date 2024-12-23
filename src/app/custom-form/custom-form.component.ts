import { AfterViewInit, Component, ElementRef, HostListener, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { FormPreviewComponent } from '../form-preview/form-preview.component';
import { SwalFireModel } from '../models/swalFire.model';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.scss'
})
export class CustomFormComponent implements AfterViewInit{

  @ViewChild('addSections') content: any;
  @ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;
  closeResult: string = '';
  connectedDropLists: any[] = [];
  inputFields: any = [];
  isEditMode: boolean = false;
  formValidations!: FormGroup;
  listingForm!: FormGroup;
  properties: any;
  sectionId: any;
  sectionList : any [] = [];
  selectedInput: any;

  inputList = [
    { type: 'text', label: 'Text', tag: 'text', controlName: 'text' },
    { type: 'checkbox', label: 'Checkbox', tag: 'checkbox', controlName: 'checkbox' },
    { type: 'file', label: 'File Upload', tag: 'input', controlName: 'fileUpload' },
    { type: 'date', label: 'Date', tag: 'input', controlName: 'date' },
    { type: 'time', label: 'Time', tag: 'input',controlName: 'time' },
    { type: 'radio', label: 'Radio', tag: 'radio', controlName: 'radio' },
    { type: 'textarea', label: 'Text Area', tag: 'textarea', controlName: 'textArea' },
    { type: 'select', label: 'Select', tag: 'select', controlName: 'select' }
  ];

  constructor(private fb: FormBuilder, private modalService: NgbModal) {}
  
  ngOnInit() {    
    this.listingForm = this.fb.group({
      inputId: [''],
      type: [''],
      placeholder: [''],
      label: [''],
      hasRange: [false],
      listingWidth: ['50%'],
      tag: [''],
      isMultiSelect: [false],
      options: this.fb.array([]),
      sectionName: [''],
      controlName: [''],
      formValidations : this.fb.group({
        fieldRequired: [true],
        minimum: [''],
        maximum: [''],
        regex: ['']
      })
    });
    
    this.listingForm.valueChanges.subscribe((res) => {
      res.inputId = this.selectedInput?.inputId;
      this.sectionList.forEach((section: any) => {
        const itemToUpdate = section.inputFields.findIndex((item: any) => item.inputId === res.inputId);
        if (itemToUpdate >= 0) {
          section.inputFields[itemToUpdate] = res; // Update properties of the item directly
        }
      });
    })
  
  }

  ngAfterViewInit() {
    this.updateConnectedDropLists();
  }
  
  // Listen for clicks on the document
  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    if(event?.target?.classList?.contains('drop-area') || event?.target?.classList?.contains('form-builder-area')) {
      this.selectedInput = null;
      return;
    }
    
    // Check if the clicked element has the desired class
    if (event?.target?.classList?.contains('form-edit-section')) {
      const childNodes = event.target.childNodes;

      // Convert childNodes to an array and check for nodes with class "inner-section-block"
      const hasInnerSectionBlock = Array.from(childNodes).some((node: any) =>
        node?.classList?.contains('inner-section-block')
      );

      if (hasInnerSectionBlock) {
        this.selectedInput = null;
      }
    } 
  }
  
  updateConnectedDropLists() {
    // Update the list of drop list IDs dynamically after the view is initialized.
    this.connectedDropLists = this.dropLists.map(dropList => dropList.id);
  }
  
  getConnectedDropListsIds(): string[] {
    return this.sectionList.map(section => `section-${section.id}`);
  }
  
  getConnectedDropLists(sectionId: number): string[] {
    return this.connectedDropLists.filter(id => id !== `section-${sectionId}`);
  }
  
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      let newItem: any = event.container.data[event.currentIndex];
        
      newItem = {
        ...event.container.data[event.currentIndex],
        placeholder: '',
        inputId: this.generateUniqueId(),
        hasRange: false,
        isMultiSelect: false,
        listingWidth: '50%',
        formValidations: {
          fieldRequired: false,
          minimum: '',
          maximum: '',
          regex: ''
        }
      }
      
      // Handle radio group creation
      if (newItem.tag === 'radio' || newItem.tag === 'checkbox' || newItem.tag === 'select') {
        newItem.options = [{ id: this.generateUniqueId(), label: 'Option 1', value: 'Option 1' }];
      }
      
      event.container.data[event.currentIndex] = newItem;
    }
    
    this.inputList =  [
      { type: 'text', label: 'Text', tag: 'text', controlName: 'text' },
      { type: 'checkbox', label: 'Checkbox', tag: 'checkbox', controlName: 'checkbox' },
      { type: 'file', label: 'File Upload', tag: 'input', controlName: 'fileUpload' },
      { type: 'date', label: 'Date', tag: 'input', controlName: 'date' },
      { type: 'time', label: 'Time', tag: 'input', controlName: 'time'},
      { type: 'radio', label: 'Radio', tag: 'radio',controlName: 'radio'},
      { type: 'textarea', label: 'Text Area', tag: 'textarea', controlName: 'textArea' },
      { type: 'select', label: 'Select', tag: 'select', controlName: 'select' }
    ];
  }
  
  get options(): FormArray {
    return this.listingForm.get('options') as FormArray;
  }
  
  addRadioOption(item: any) {
    this.options.push(
      this.fb.group({
        id: this.generateUniqueId(),
        label: [`Option ${item.options.length + 1}`],
        value: [ `Option ${item.options.length + 1}`],
      })
    );
  }
  
  saveSection() {
    const existingSectionIndex = this.sectionList.findIndex(section => section.id === this.sectionId);
    if (existingSectionIndex === -1) {
      // Section does not exist, push the new section
      this.sectionList.push({
        sectionName: this.listingForm.value.sectionName,
        id: this.sectionList.length, // You can adjust this to set a unique id, depending on your logic
        inputFields: []
      });
    } else {
      // Section exists, update it (optional if you want to modify existing section)
      this.sectionList[existingSectionIndex] = {
        ...this.sectionList[existingSectionIndex],  // Keep existing data
        sectionName: this.listingForm.value.sectionName,  // Update section name with the new value
      };
    }
    this.modalService.dismissAll();
  }
  
  /**
   * Method to generate unique id
   * @returns 
   */
  generateUniqueId(): string {
    // Example of a unique ID generator using a timestamp and a random number
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  /**
   * Method to add new section in form
   * @param content 
   * @param sectionDetails 
   */
  addSection(content: TemplateRef<any>, sectionDetails?: any) {
    this.isEditMode = sectionDetails ? true : false;
    this.sectionId = null;
    this.listingForm.get('sectionName')?.patchValue('')
    if (sectionDetails) {
      // If editing, set the sectionName form control with the value to be edited
      this.listingForm.patchValue({
        sectionName: sectionDetails.sectionName,
      });
      this.sectionId = sectionDetails.id
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.modalService.dismissAll();
      },
      (reason) => {
      },
    );
  }
  
  /**
   * Method to open preview form modal
   */
  openPreviewModal() {
    const previewRef = this.modalService.open(FormPreviewComponent, { centered: true, backdrop: 'static', scrollable: true, windowClass: 'custom-class-max-width1100'  });
    previewRef.componentInstance.formData = this.sectionList;
    previewRef.componentInstance.formPreviewModal.subscribe(() => { 
      this.modalService.dismissAll();
    })
  }

  /**
   * Method to set data for selected input field
   * @param item 
   */
  onSelectInput(item: any) {
    this.selectedInput = item;
  }

  /**
   * Method to delete the section
   */
  deleteSection(section: any) {
    Swal.fire(new SwalFireModel({
      title: "Please confirm!",
      text: 'Are you sure you want to delete this section? This cannot be undone.',
      confirmButtonText: 'Delete',
      confirmButtonColor: '#F73F3F'
    })).then((result) => {
      if (result.isConfirmed) {
        this.sectionList = this.sectionList.filter(item => item.id != section.id)
      } else {
        return;
      }
    });
  }

  /**
   * Method to detlet the input
   * @param input 
   */
  deleteInput(input: any) {
    Swal.fire(new SwalFireModel({
      title: "Please confirm!",
      text: 'Are you sure you want to delete this input? This cannot be undone.',
      confirmButtonText: 'Delete',
      confirmButtonColor: '#F73F3F'
    })).then((result) => {
      if (result.isConfirmed) {
        this.sectionList = this.sectionList.map(section => ({
          ...section,
          inputFields: section.inputFields.filter((item: any) => item.inputId !== input.inputId)
        }));
      } else {
        return;
      }
    });
  }
}
