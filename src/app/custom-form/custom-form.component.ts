import { AfterViewInit, Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.scss'
})
export class CustomFormComponent implements AfterViewInit{

  @ViewChild('addSections') content: any;

  sectionList : any [] = [];
  sectionId: any;
  properties: any;
  selectedInput: any;
  done: any = [];
  listingForm!: FormGroup;
  closeResult: string = '';

  @ViewChildren(CdkDropList) dropLists!: QueryList<CdkDropList>;

  connectedDropLists: any[] = [];

  inputList = [
    { type: 'text', name: 'text', label: 'Text', tag: 'input', inputId: 'text' },
    { type: 'checkbox', name: 'checkbox', label: 'Checkbox', tag: 'checkbox', inputId: 'checkbox' },
    { type: 'file', name: 'file', label: 'File Upload', tag: 'input', inputId: 'file' },
    { type: 'date', name: 'date', label: 'Date', tag: 'input', inputId: 'date' },
    { type: 'time', name: 'time', label: 'Time', tag: 'input', inputId: 'time' },
    { type: 'radio', name: 'radio', label: 'Radio', tag: 'radio', inputId: 'radio' },
    { type: 'textarea', name: 'textarea', label: 'Text Area', tag: 'textarea', inputId: 'textarea' },
    { type: 'select', name: 'select', label: 'Select', tag: 'select', inputId: 'select' },
    {type: 'section', name: 'section', label: 'Section', tag:'section', inputId: 'section'}
  ];

  constructor(private fb: FormBuilder, private modalService: NgbModal) {}
  
  ngOnInit() {
    this.listingForm = this.fb.group({
      inputId: [''],
      name: [''],
      type: [''],
      placeholder: [''],
      label: [''],
      description: [''],
      isActive: [true],
      listingWidth: ['100%'],
      tag: [''],
      sectionName: ['']
    });
    
    this.listingForm.valueChanges.subscribe((res) => {
      res.id = this.selectedInput?.id;
      this.sectionList.forEach((section: any) => {
        const itemToUpdate = section.done.find((item: any) => item.id === res.id);
        if (itemToUpdate) {
          Object.assign(itemToUpdate, res); // Update properties of the item directly
        }
      });
    })
  
  }

  ngAfterViewInit() {
    this.updateConnectedDropLists();
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
  
      const newItem = event.container.data[event.currentIndex];
      newItem.id = this.generateUniqueId();
      newItem.backgroundColor = '';
      newItem.placeholder = '';
      newItem.listingWidth = '100%';
      
      event.container.data[event.currentIndex] = {
        ...event.container.data[event.currentIndex],
        placeholder: '',
        description: '',
        id: this.generateUniqueId(),
        isActive: true,
        listingWidth: '100%'
      }
    }
    
    this.inputList =  [
      { type: 'text', name: 'text', label: 'Text', tag: 'input', inputId: 'text' },
      { type: 'checkbox', name: 'checkbox', label: 'Checkbox', tag: 'checkbox', inputId: 'checkbox' },
      { type: 'file', name: 'file', label: 'File Upload', tag: 'input', inputId: 'file' },
      { type: 'date', name: 'date', label: 'Date', tag: 'input', inputId: 'date' },
      { type: 'time', name: 'time', label: 'Time', tag: 'input', inputId: 'time' },
      { type: 'radio', name: 'radio', label: 'Radio', tag: 'radio', inputId: 'radio' },
      { type: 'textarea', name: 'textarea', label: 'Text Area', tag: 'textarea', inputId: 'textarea' },
      { type: 'select', name: 'select', label: 'Select', tag: 'select', inputId: 'select' },
      {type: 'section', name: 'section', label: 'Section', tag:'section', inputId: 'section'}
    ];
  }
  
  saveSection() {

    const existingSectionIndex = this.sectionList.findIndex(section => section.id === this.sectionId);

    if (existingSectionIndex === -1) {
      // Section does not exist, push the new section
      this.sectionList.push({
        sectionName: this.listingForm.value.sectionName,
        id: this.sectionList.length, // You can adjust this to set a unique id, depending on your logic
        done: []
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
  
  generateUniqueId(): string {
    // Example of a unique ID generator using a timestamp and a random number
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  addSection(content: TemplateRef<any>, sectionDetails?: any) {
    this.sectionId = null;
    if (sectionDetails) {
      // If editing, set the sectionName form control with the value to be edited
      this.listingForm.patchValue({
        sectionName: sectionDetails.sectionName,
      });
      this.sectionId = sectionDetails.id
    } else {
      // Reset the form if adding a new section
      this.listingForm.reset();
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

  onSelectInput(item: any) {
    this.selectedInput = item;
  }
}
