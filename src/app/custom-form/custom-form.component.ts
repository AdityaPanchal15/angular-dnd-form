import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.scss'
})
export class CustomFormComponent {
  inputList = [
    { type: 'text', name: 'text', label: 'Text', tag: 'input', inputId: 'text' },
    { type: 'checkbox', name: 'checkbox', label: 'Checkbox', tag: 'checkbox', inputId: 'checkbox' },
    { type: 'file', name: 'file', label: 'File Upload', tag: 'input', inputId: 'file' },
    { type: 'date', name: 'date', label: 'Date', tag: 'input', inputId: 'date' },
    { type: 'time', name: 'time', label: 'Time', tag: 'input', inputId: 'time' },
    { type: 'radio', name: 'radio', label: 'Radio', tag: 'radio', inputId: 'radio' },
    { type: 'textarea', name: 'textarea', label: 'Text Area', tag: 'textarea', inputId: 'textarea' },
    { type: 'select', name: 'select', label: 'Select', tag: 'select', inputId: 'select' },
  ];
  
  properties: any;
  
  selectedInput: any;

  done: any = [];
  listingForm?: FormGroup;
  
  constructor(private fb: FormBuilder) {}
  
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
      listingHeight: [null],
      backgroundColor: [''],
      textColor: [''],
      borderColor: [''],
      fontFamily: [''],
      fontSize: [null],
      padding: [''],
      margin: [''],
      tag: ['']
    });
    
    this.listingForm.valueChanges.subscribe((res) => {
      console.log(res);
      res.id = this.selectedInput.id;
      this.done = this.done.map((item: any) => {
        if(item.id === res.id) {
          item = res;
        }
        return item;
      })
    })
  }

  drop(event: any) {
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
    ];
  }
  
  generateUniqueId(): string {
    // Example of a unique ID generator using a timestamp and a random number
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  
  onSelectInput(selectedInput: any) {
    this.selectedInput = selectedInput;
  }
}
