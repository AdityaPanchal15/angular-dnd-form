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
  properties: any;
  selectedInput: any;
  done: any = [];
  listingForm!: FormGroup;
  closeResult: string = '';
  sectionName: string = '';

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
      tag: ['']
    });
    
    this.listingForm.valueChanges.subscribe((res) => {
      console.log(res);
      res.id = this.selectedInput.id;
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
    this.sectionList.push({ sectionName: this.sectionName, id: this.sectionList.length, done: [] });
    this.sectionName = '';
    this.modalService.dismissAll();
  }
  
  generateUniqueId(): string {
    // Example of a unique ID generator using a timestamp and a random number
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  addSection(content: TemplateRef<any>) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.modalService.dismissAll();
        },
        (reason) => {
        },
      );
    console.log('done: ', this.done);
  }

  onSelectInput(item: any) {
    this.selectedInput = item;
  }
}
