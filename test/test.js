const chai =require (`chai`);
const expect = chai.expect;
const validator = require(`../AddressBook`);

describe(`checking Different cases for the Address Book Details `, ()=>{
    it( "should return true for first name have min 3 letter " ,()=>{
        expect(validator.regex_Patterns('Vaibhaw')).to.be.true;
    })
    it( "should return false for first name have min 3 letter && First Letter must be Capital" ,()=>{
        expect(validator.regex_Patterns('va')).to.be.false;
    })
    it( "should return Entry Deleted from the file " ,()=>{
        expect(validator.regex_Patterns('7387944658')).to.be.false;
    })
    it( "should return Entry not found in address book " ,()=>{
        expect(validator.regex_Patterns()).to.be.true;
    })
    it( "should return false for first name have min 3 letter " ,()=>{
        expect(validator.regex_Patterns(86546)).to.be.false;
    })
    it( "should return true for Last name have min 3 letter " ,()=>{
        expect(validator.regex_Patterns('Tik')).to.be.true;
    })  
     it( "should return false for Last name have min 3 letter " ,()=>{
        expect(validator.regex_Patterns(4654654)).to.be.false;
    })
 
})

