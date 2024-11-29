import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.scss'
})
export class CustomFormComponent {
  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];
  
  inputList = [
    { type: 'text', name: 'text', label: 'Text' },
    { type: 'checkbox', name: 'checkbox', label: 'Checkbox' },
    { type: 'select', name: 'select', label: 'Select' },
  ];
  
  properties: any;
  
  selectedInput: any;

  done: any = [];
  listingForm?: FormGroup;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.listingForm = this.fb.group({
      name: [''],
      type: [''],
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
      margin: ['']
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
                        
      const droppedItem = event.container.data[event.currentIndex];
      droppedItem.id = this.generateUniqueId();
      // // Transfer the item to the new container and place it at the bottom
      // const previousData = event.previousContainer.data[event.previousIndex];
      
      // // Remove the item from the previous container
      // event.previousContainer.data.splice(event.previousIndex, 1);

      // // Push the item to the end of the target container
      // const newItem = { ...previousData, id: this.generateUniqueId() }; // Ensure a unique ID
      // event.container.data.push(newItem);
    }
    this.inputList = [
      { type: 'text', name: 'text', label: 'Text' },
      { type: 'checkbox', name: 'checkbox', label: 'Checkbox' },
      { type: 'select', name: 'select', label: 'Select' },
    ];
  }
  
  generateUniqueId(): string {
    // Example of a unique ID generator using a timestamp and a random number
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  
  onSelectInput(selectedInput: any) {
    console.log(this.listingForm);
    
    this.selectedInput = selectedInput;
  }
}
