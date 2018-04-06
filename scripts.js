window.onload = function () {
    //buttons
    var quickAddBtn = document.getElementById("Quickadd");
    var Addbtn = document.getElementById("Add");
    var quickCancelBtn = document.getElementById("cancel");
    var quickAddFormDiv = document.getElementById("quick-form");
    var contactlistDiv = document.querySelector(".contact-list")

    //formField
    var firstname = document.getElementById("firstname");
    var lastname = document.getElementById("lastname");
    var address = document.getElementById("address");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");
    var idEl = document.getElementById("index");

    //address book display
    var contactlist = document.querySelector(".contact-list");

    //create storage array
    var addressbook = [];

    //Event Listners
    quickAddBtn.addEventListener("click", toggleFormDisplay);
    function toggleFormDisplay () {
        quickAddFormDiv.style.display = quickAddFormDiv.style.display === "none" ? "block" : "none";
    }
    Addbtn.addEventListener("click", saveFn);
    contactlistDiv.addEventListener("click", removeEntry);
    quickCancelBtn.addEventListener("click", toggleFormDisplay);

    function saveFn () {
        if(!idEl.value) {
            addtolist();
        } else {
            editList(idEl.value);
        }
    }

    function jsonStructure(firstname, lastname, address, phone, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.id = new Date().getTime().toString();
    }
    function addtolist() {
        var isNull = firstname.value != '' && lastname.value != '' && address.value != '' && phone.value != '' && email.value != '';
        if (isNull) {
            //add the contents of the form to the array and localstorage
            var obj = new jsonStructure(firstname.value, lastname.value, address.value, phone.value, email.value);
            addressbook.push(obj);
            //hide the form panel
            quickAddFormDiv.style.display = "none";
            addressbook.forEach(function(contact){
                var id = contact.id;               
                var ele = document.createElement('div');
                ele.className = "entry";
                ele.setAttribute("id", id);
                for(var key in contact){
                    if(key !== 'id'){
                        var elmChild = document.createElement("div");
                        elmChild.className = key;
                        var elmGrandChild = document.createElement("p");
                        elmGrandChild.innerText = contact[key];
                        elmChild.appendChild(elmGrandChild);
                        ele.appendChild(elmChild);
                    }
                }
                var delDiv = document.createElement('div');
                delDiv.className = "del";
                var delButton = document.createElement('button');
                delButton.setAttribute("data-id", id);                
                delButton.addEventListener('click', removeEntry);
                delButton.textContent = 'Delete';
                var editbutton = document.createElement('button');
                editbutton.setAttribute("data-id", id);
                editbutton.addEventListener("click", editEntry);
                editbutton.textContent = "Edit";
                ele.appendChild(editbutton);

                ele.appendChild(delButton);
                contactlistDiv.insertBefore(ele, contactlistDiv.childNodes[0]); 
            });

            //clear form
            clearForm();
            // updating and displaying all records in the addressbook
            // showaddressbook();
        }
    }

    function myFunction() {
        var x = document.getElementsByClassName(".contact-list");
    }

    function editEntry(e) {
        e.stopPropagation();
        var remID = e.target.getAttribute("data-id");
        var entry = addressbook.find(function (address) {
            return address.id == remID;
        });

        firstname.value = entry.firstname;
        lastname.value = entry.lastname;
        address.value = entry.address;
        phone.value = entry.phone;
        email.value = entry.email;
        idEl.value = remID;
        toggleFormDisplay();
    }

    function editList(id){
        
    }

    function removeEntry(e) {
            e.stopPropagation();
            var remID = e.target.getAttribute("data-id");
            var foundChild = document.getElementById(remID);
            contactlistDiv.removeChild(foundChild);
            addressbook = addressbook.filter(function(contact){
                return contact.id != remID;
            })
    }

    function clearForm() {
        firstname.value = '';
        lastname.value = '';
        address.value = '';
        phone.value = '';
        email.value = '';
        idEl.value = '';
    }

    function showaddressbook() {
        // check if the key "contactlist" exists in localstorage or else create it
        //if it exists, load contents from the localstorage and loop > display it on the page
        if (localStorage['contactlist'] === undefined) {
            localStorage['contactlist'] = "[]";
        } else {
            addressbook = JSON.parse(localStorage['contactlist']);
            contactlistDiv.innerHTML = '';
            for (var n in addressbook) {
                var str = '<div class= "entry">'
                str += '<div class= "firstname"><p>' + addressbook[n].firstname + '</p></div>';
                str += '<div class= "lastname"><p>' + addressbook[n].lastname + '</p></div>';
                str += '<div class= "address"><p>' + addressbook[n].address + '</p></div>';
                str += '<div class= "phone"><p>' + addressbook[n].phone + '</p></div>';
                str += '<div class= "email"><p>' + addressbook[n].email + '</p></div>';
                str += '<div class= "del"><a href= "#" class="delbutton" data-id="' + n + '">Delete</a></div>'
                str += '</div>'
                contactlistDiv.innerHTML += str;
            }
        }
    }
    showaddressbook();

}
