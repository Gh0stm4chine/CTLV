import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { GitHubService } from '../../github.service';
import { GitHubUser } from '../../githubuser'

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactService]
})

export class ContactListComponent implements OnInit {

  contacts: Contact[]
  selectedContact: Contact
  gitHubUser: GitHubUser;
  gitURL : String;
  gitNbRepos : number;

  constructor(private contactService: ContactService, private gitHubService : GitHubService) { }

  ngOnInit() {
     this.contactService
      .getContacts()
      .then((contacts: Contact[]) => {
        this.contacts = contacts.map((contact) => {
          if (!contact.phone) {
            contact.phone = {
              mobile: '',
              work: ''
            }
          }
          return contact;
        });
      });
  }

  private getIndexOfContact = (contactId: String) => {
    return this.contacts.findIndex((contact) => {
      return contact._id === contactId;
    });
  }

  selectContact(contact: Contact) {
    this.gitHubUser = null
    this.selectedContact = contact
  }

  createNewContact() {
    var contact: Contact = {
      name: '',
      email: '',
      gitHubName: '',
      phone: {
        work: '',
        mobile: ''
      }
    };

    // By default, a newly-created contact will have the selected state.
    this.selectContact(contact);
  }

  deleteContact = (contactId: String) => {
    var idx = this.getIndexOfContact(contactId);
    if (idx !== -1) {
      this.contacts.splice(idx, 1);
      this.selectContact(null);
    }
    return this.contacts;
  }

  addContact = (contact: Contact) => {
    this.contacts.push(contact);
    this.selectContact(contact);
    return this.contacts;
  }

  updateContact = (contact: Contact) => {
    var idx = this.getIndexOfContact(contact._id);
    if (idx !== -1) {
      this.contacts[idx] = contact;
      this.selectContact(contact);
    }
    return this.contacts;
  }

  fetchGitHubUrl(): void {
    this.gitHubService.getName(this.selectedContact.gitHubName).then(user => { //pour l'instant c'est comme ca mais on peut recuperer le nom que le user a rentre
      //console.log("Ouss" + JSON.stringify(user) + user.name);
      this.gitHubUser = user;
      //console.log("Oussama" + this.gitHubUser.name);
      this.gitURL = user.html_url;
      this.gitNbRepos = user.public_repos;
    });
  }

}
