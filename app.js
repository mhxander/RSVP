document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');      //looking for form from index.html
  const input = form.querySelector('input');              //saving the input from the form
  
  const mainDiv = document.querySelector('.main');        //calling mainDiv to add checkbox
  const ul = document.getElementById('invitedList');      //looks for "invitedList" ul
  
  const div = document.createElement('div');                    //create div
  const filterLabel = document.createElement('label');          //create checkbox's label
  const filterCheckbox = document.createElement('input');       //create checkbox


  filterLabel.textContent = "Hide those who haven't responded"; //label content
  filterCheckbox.type = 'checkbox';                             //type is checkbox
  div.appendChild(filterLabel);                                 //add label to div
  div.appendChild(filterCheckbox);                              //add checkbox to div
  mainDiv.insertBefore(div, ul);                                //insert div before ul(.main)
  filterCheckbox.addEventListener('change', (e) => {            //Event on checkbox
    const isChecked = e.target.checked;                         //checks if checked
    const lis = ul.children;                                    //sends it to children of ul(li elements and beyond)
    if (isChecked) {                                            //if it is checked...
      for (let i = 0; i < lis.length; i += 1) {                 //run a for loop through all choices
        let li = lis[i];                                        //li=each list item
        if (li.className === 'responded') {                     //if responded...
          li.style.display = '';                                //display it
        } else {                                                //if not responded
          li.style.display = 'none';                            //don't show it.
        }
      }
    } else {                                                    //if top checkbox isn't checked
      for (let i = 0; i < lis.length; i += 1) {                 //run through loop
        let li = lis[i];                                        //li=each list item
        li.style.display = '';                                  //display each one.
      }
    }
  });
  
  function createLI(text) {                               //create li function
    function createElement(elementName, property, value) {  //cleanup-createElement
      const element = document.createElement(elementName);  //ex: span=d.cE('span')
      element[property] = value;                            //ex: span.textContent=text
      return element;                                       //return element
    }
    
    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);          //create new element, sets value
      li.appendChild(element);                                 //changes li to a html object(span)
      return element;
    }
    
    const li = document.createElement('li');              //creates new li
    appendToLI('span', 'textContent', text);          //create new element, sets span
    appendToLI('label', 'textContent', 'Confirmed')
      .appendChild(createElement('input', 'type', 'checkbox'));                          //add "checkbox" to label
    appendToLI('button', 'textContent', 'edit');      //create new button for edit
    appendToLI('button', 'textContent', 'remove');  //create new button for remove
    return li;                                            //return li from function
  }
  
  form.addEventListener('submit', (e) => {                //submit from form
    e.preventDefault();                                   //stops page from reloading every time we load the form
    const text = input.value;                             //setting text constant as input value 
    input.value = '';                                     //resets input field to blank
    const li = createLI(text);                            //li=function we created above
    ul.appendChild(li);                                   //adds li elemnent to the list 
  });
  
  ul.addEventListener('change', (e) => {                  //add event listener on ul, so it goes through all li
    const checkbox = event.target;                        //targeted checkbox causes change
    const checked = checkbox.checked;                     //when checked, sets checked variable
    const listItem = checkbox.parentNode.parentNode;      //sets listItem to ul(parentNode twice)
  
    if (checked) {                                        //If checkbox gets checked...
      listItem.className = 'responded';                   //class of input becomes responded, with special border
    } else {                                              //otherwise
      listItem.className = '';                            //class not responded, so no border
    }
  });
  
  ul.addEventListener('click', (e) => {                   //eventListener on buttons
    if (e.target.tagName === 'BUTTON') {                  //only if button is clicked...
      const button = e.target;                            //set e.target to button, so easier to read
      const li = button.parentNode;                       //get parent node
      const ul = li.parentNode;                           //set ul to parent node
      const action = button.textContent;
      const nameActions = {
        remove: () => {
          ul.removeChild(li);
        },
        edit: () => {
          const span = li.firstElementChild;              //span = first child(name is first)
          const input = document.createElement('input');  //creat input field
          input.type = 'text';                            //input gets text
          input.value = span.textContent;                 //inputs pre-edit name so can be edited
          li.insertBefore(input, span);                   //insert new input before span
          li.removeChild(span);                           //remove old span
          button.textContent = 'save';                    //set button to Save instead of Edit
        },
        save: () => {
          const input = li.firstElementChild;             //input is first child
          const span = document.createElement('span');    //create span element
          span.textContent = input.value;                 //set span value to new input value
          li.insertBefore(span, input);                   //inputs new span before input
          li.removeChild(input);                          //remove completed input
          button.textContent = 'Edit';                    //sets button back to Edit
        }
      };
                      
//select and run action in button's name
      nameActions[action]();                              //call nameActions with action to remove, edit, or save[action]
    }
  });
});