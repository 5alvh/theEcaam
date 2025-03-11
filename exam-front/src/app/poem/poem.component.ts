import { Component, Input, OnInit } from '@angular/core';
import { Poem } from '../common/poem';
import { ResendService } from '../service/resend.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoemsService } from '../service/poems.service';
import { LocalHostLikeService } from '../service/local-host-like.service';

@Component({
  selector: 'app-poem',
  imports: [NgIf, FormsModule],
  templateUrl: './poem.component.html',
  styleUrl: './poem.component.css'
})
export class PoemComponent implements OnInit{

  @Input() poem!: Poem;
  isEmailVisible: boolean = false;
  email: string = '';
  liked: boolean = false;

  constructor(private emailService: ResendService, private poemsService: PoemsService, private likeService: LocalHostLikeService) {}
  ngOnInit(): void {
    this.liked = this.likeService.getLiked(this.poem.id);
    console.log(this.poem.image);
  }

  showScreen() {
      this.isEmailVisible = true;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
  
  sharePoem(email: string) {
    if (!this.isValidEmail(email)) {
      console.error('Invalid email address');
      return;
    }

    const to = email;
    const subject = 'Hello World';
    const htmlContent = '<p>Congrats on sending your <strong>first email</strong>!</p>';

    this.emailService.sendEmail(to, subject, htmlContent).then(
      response => {
        console.log('Email sent successfully', response);
        this.email = '';
        this.isEmailVisible = false; 
      },
      error => {
        console.error('Error sending email', error);
      }
    );
  }
  likePoem() {
    this.likeService.toggleLiked(this.poem.id);
    this.liked = this.likeService.getLiked(this.poem.id); 
    
    if (this.liked) {
      this.poemsService.likePoem(this.poem.id).subscribe(() => {
        this.poem.likes++;
      });
    } else {
      this.poemsService.dislikePoem(this.poem.id).subscribe(() => {
        this.poem.likes--;
      });
    }
  }
}
