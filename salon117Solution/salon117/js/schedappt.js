/// <reference path="js/jquery-1.8.3.js" />

$(document).ready(function () {
    contactsNamespace.initialize();
});

(function () {
    this.contactsNamespace = this.contactsNamespace || {};
    var ns = this.contactsNamespace;
    var currentRecord;

    ns.initialize = function () {
        $('#btnSave').on('click', ns.save);
     ns.display();

    };
    function retrieveFromStorage() {
        var contactsJSON = localStorage.getItem('contacts');
        return contactsJSON ? JSON.parse(contactsJSON) : [];
    }
    ns.display = function () {
        $('#currentAction').html('Add Contact');
        currentRecord = { key: null, contact: {} };
        displayCurrentRecord();
        var results = retrieveFromStorage();
        bindToGrid(results);
    };
    //iterate through results array, creating a row for each record
    //display message if no records in storage

    function bindToGrid(results) {
        var html = '';
        for (var i = 0; i < results.length; i++) {
            var contact = results[i];
            html += '<tr><td>' + contact.apptdt + '</td>';
            html += '<td>' + '  ' + contact.apptTime + '</td>';
            html += '<td>' + '  ' + contact.fname + ' ' + contact.lname + '</td>';
            html += '<td>  </td>';
            html += '<td>' + '    ' + contact.treatment + '</td>';
            html += '<td>' + '    ' + contact.stylist + '</td>';
            html += '<td>  </td>';
            html += '<td>' + '    ' + contact.phoneNumber + '</td></tr>';
            
        }
        html = html || '<tr><td colspan="3">No records available</td></tr>';
        $('#contacts tbody').html(html);
   //     $('#contacts a.edit').on('click', ns.loadContact);
    }

    ns.loadContact = function () {
        var key = parseInt($(this).attr('data-key'));
        var results = retrieveFromStorage();
        $('#currentAction').html('Edit Contact');
        currentRecord = { key: key, contact: results[key] }
        displayCurrentRecord();
    };
    
    function displayCurrentRecord() {
        var contact = currentRecord.contact;
        $('#fname').val(contact.fname);
        $('#lname').val(contact.lname);
        $('#email').val(contact.email);
        $('#phoneNumber').val(contact.phoneNumber);
        $('#apptdt').val(contact.apptdt);
        $('#apptTime').val(contact.apptTime);
        $('#stylist').val(contact.stylist);
        $('#treatment').val(contact.treatment);
    }
    ns.save = function () {
        var contact = currentRecord.contact;
        contact.fname = $('#fname').val();
        contact.lname = $('#lname').val();
        contact.email = $('#email').val();
        contact.phoneNumber = $('#phoneNumber').val();
        contact.apptdt = $('#apptdt').val();
        contact.apptTime = $('#apptTime').val();
        contact.stylist = $('#stylist').val();
        contact.treatment = $('#treatment').val();
       
        var results = retrieveFromStorage();

        if (currentRecord.key != null) {
            results[currentRecord.key] = contact;
        }
        else {
            results.push(contact);
        }
        localStorage.setItem('contacts', JSON.stringify(results));
        alert('Thank You ' + contact.fname + ' for your Appointment');
       ns.clearForm();
    };

    ns.clearForm = function () {
       $('#fname').val('');
        $('#lname').val('');
        $('#email').val('');
        $('#phoneNumber').val('');
        $('#apptdt').val('');
        $('#stylist').val('');
        $('#treatment').val('');
    };

})();
