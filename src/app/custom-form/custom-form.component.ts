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
      listingWidth: ['50%'],
      tag: [''],
      sectionName: ['']
    });
    
    this.listingForm.valueChanges.subscribe((res) => {
      console.log(res);
      res.id = this.selectedInput.id;
      this.done = this.done.map((item: any) => {
        if(item.id === res.id) {
          item = res;
          // item.sectionName = this.sectionName;
        }
        return item;
      })
    })
  
  }

  ngAfterViewInit() {
    this.updateConnectedDropLists();
  }

  drop(event: any) {
    debugger
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        
      event.container.data[event.currentIndex] = {
        ...event.container.data[event.currentIndex],
        backgroundColor: '',
        placeholder: '',
        borderColor: '',
        description: '',
        fontFamily: '',
        fontSize: '',
        id: this.generateUniqueId(),
        isActive: true,
        listingHeight: '',
        listingWidth: '100%',
        margin: '',
        padding: '',
        textColor: ''
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
  
  generateUniqueId(): string {
    // Example of a unique ID generator using a timestamp and a random number
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  
  // onSelectInput(selectedInput: any) {
  //   this.selectedInput = selectedInput;
  // }

  addSection(content: TemplateRef<any>) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
        },
      );
    console.log('done: ', this.done);
  }

  saveSection() {
    this.sectionList.push({'sectionName': this.sectionName, id: this.sectionList.length})
    // this.sectionList = this.sectionList.map((section, index) => {
    //   return { sectionName: section, id: index };  // Ensure the object is returned
    // });
    this.sectionName = ''
    console.log(this.sectionList)
  }

  // Update the connected drop lists dynamically
  updateConnectedDropLists() {
    debugger
    this.connectedDropLists = this.dropLists.toArray();
  }

  // drop(event: any) {
  //   console.log('Dropped item:', event);
  // }

  onSelectInput(item: any) {
    this.selectedInput = item;
  }

  get getConnectedDropListsIds() {
    return this.connectedDropLists.map(list => list.id)
  }

  // Dynamically return connected drop lists for each section
  getConnectedDropLists(sectionId: number): any[] {
    return this.connectedDropLists
      .filter((_, index) => index !== sectionId) // Connect all drop lists except the current one
      .map(dropList => dropList.id);  // Use the id to connect the lists
  }

  // getConnectedDropLists(sectionId: number): any[] {
  //   return this.sectionList.filter(section => section.id !== sectionId)
  //     .map(section => `doneList-${section.id}`); // Create a reference to connect
  // }
}
