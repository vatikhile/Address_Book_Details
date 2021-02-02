const readline = require('readline-sync');
const fs = require('fs');

class AddressBook {
    constructor() {
        this.data = fs.readFileSync('./JSON/AddressBook.json', 'utf8');
        this.addressbook = JSON.parse(this.data);
    }
    /************************Main function. Program starts with this function ******************************** */
    addressBook() {

        console.log('------------Address Book---------------');
        console.log('\n1. Add new entry in address book.\n2. Delete entry from address book.\n3.Search Entry \n4.Update Entry \n5.Print address book.\n');
        var ch = readline.questionInt('Enter your choice : \n');
        switch (ch) {
            case 1.:
                obj.addPerson();
                console.log('\nRecord saved in address book......\n');
                obj.addressBook();
                break;
                case 2.:
                    obj.printAddressBook();
                    var mobileno = readline.questionInt('Enter 10 digit mobile number : ');
                    let result = obj.delPerson(mobileno);
                    console.log(`${result}`);
                    obj.addressBook();
                    break;
            default:
                break;
        }
    }
    /****************Adding new entry in the address book. ******************************** */
    addPerson() {
        var flag = false;
        var isValid = false;
        // do {
        while (!isValid) {
            var fname = readline.question('Enter first name : ')
            isValid = this.regex_Patterns(fname);
        }
        isValid = false;
        while (!isValid) {
            var lname = readline.question('Enter last name : ');
            isValid = this.regex_Patterns(lname);
        }
        isValid = false;
        while (!isValid) {
            var mobileno = readline.questionInt('Enter 10 digit mobile number : ');
            console.log("vvv", mobileno);
            var PHONE_NUMBER_PATTERN = /(7|8|9)\d{9}/;
            if (mobileno.toString().match(PHONE_NUMBER_PATTERN)) {
                isValid = true;
            }
        }

        var city = readline.question('Enter City : ');
        var state = readline.question('Enter State : ');
        var zipcode = readline.questionInt('Enter zip code : ');

        for (let i = 0; i < this.addressbook.AddressBook.length; i++) {
            if (this.addressbook.AddressBook[i] == null) {
                continue;
            }
            if (mobileno == this.addressbook.AddressBook[i].MobileNo) {
                flag = true;
                break;
            }
        }

        if (flag) {
            console.log('\nEntry already present with this mobile number in address book, try another .........\n');
            obj.addPerson();
        }
        else {
            var newPerson = {
                "FirstName": fname,
                "LastName": lname,
                "MobileNo": mobileno,
                "City": city,
                "State": state,
                "ZipCode": zipcode
            }
            this.addressbook.AddressBook.push(newPerson);
            this.saveData();
        }
    }

    /* Checking the Details follow the regex Patterns */

    regex_Patterns = (value) => {
        let NAME_PATTERN = /^[A-Z]{1}[a-z]{2,}$/;

        if (value.match(NAME_PATTERN)) {

            return true
        }
        else {
            console.log(`Invalid ${value} Name`);
            return false


        }

    }
      /******************Deleting entry from the address book******************* */
      delPerson(mobile_number) {
        var ch = 0, flag = false;
        for (let i = 0; i < this.addressbook.AddressBook.length; i++) {
            if (this.addressbook.AddressBook[i] == null) {
                continue;
            }
            if (mobile_number == this.addressbook.AddressBook[i].MobileNo) {
                ch = i;
                flag = true;
                break;
            }
        }

        if (flag) {
            delete this.addressbook.AddressBook[ch];
            this.saveData();
            return 'Entry Deleted from the file'
        }
        else {
            console.log('Entry not found in address book......');
            return 'Entry not found in address book......'
        }
    }
        /****************************Printing the address book.************************************** */
        printAddressBook() {
            var j = 1;
            console.log('----------------------------------Address Book details-----------------------------------------\n');
    
            console.log('Sr.No.  First Name\tLast Name\t Mobile No.\t  City\t   State   \t ZIP code');
            for (let i = 0; i < this.addressbook.AddressBook.length; i++) {
                if (this.addressbook.AddressBook[i] == null) {
                    continue;
                }
                console.log(j++ + '.\t' + this.addressbook.AddressBook[i].FirstName
                    + '\t\t ' + this.addressbook.AddressBook[i].LastName
                    + '\t\t' + this.addressbook.AddressBook[i].MobileNo
                    + '\t ' + this.addressbook.AddressBook[i].City
                    + '\t ' + this.addressbook.AddressBook[i].State
                    + '\t ' + this.addressbook.AddressBook[i].ZipCode);
            }
        }
    saveData() {
        var json = JSON.stringify(this.addressbook, null, 2);
        fs.writeFileSync('./JSON/AddressBook.json', json);
    }

}
//Creating an object of the class.
var obj = new AddressBook();
//calling function.
obj.addressBook();