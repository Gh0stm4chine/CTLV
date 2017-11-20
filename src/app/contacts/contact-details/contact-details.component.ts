import { Component, Input } from '@angular/core';
import { Contact } from '../contact';
import { Telephone  } from '../telephone';
import { ContactService } from '../contact.service';
import { GitHubService } from '../../github.service';
import { GitHubUser } from '../../githubuser'

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})

export class ContactDetailsComponent {
  @Input()
  contact: Contact;

  telephoneBis : void | Telephone;

  gitHubUser: GitHubUser;
  gitURL : String;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private contactService: ContactService, private gitHubService : GitHubService) {}

  ngOnInit() {
     this.contactService.getTelephone("123").then(number => {
        this.telephoneBis = number;
    });

  }

  createContact(contact: Contact) {
    this.contactService.createContact(contact).then((newContact: Contact) => {
      this.createHandler(newContact);
    });
  }

  updateContact(contact: Contact): void {
    this.contactService.updateContact(contact).then((updatedContact: Contact) => {
      this.updateHandler(updatedContact);
    });
  }

  deleteContact(contactId: String): void {
    this.contactService.deleteContact(contactId).then((deletedContactId: String) => {
      this.deleteHandler(deletedContactId);
    });
  }

  fetchGitHubUrl(): void{
    this.gitHubService.getName(this.contact.gitHubName).then(user => { //pour l'instant c'est comme ca mais on peut recuperer le nom que le user a rentre
      console.log("Ouss" + JSON.stringify(user) + user.name);
      this.gitHubUser = user;
      console.log("Oussama" + this.gitHubUser.name);
      this.gitURL = user.html_url;
    });
  }

}
