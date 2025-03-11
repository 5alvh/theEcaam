import { Injectable } from '@angular/core';
import { Resend } from 'resend';
@Injectable({
  providedIn: 'root'
})
export class ResendService {

  private resend: Resend;

  constructor() {
    this.resend = new Resend('re_YWnu1B52_DY6fSNawvoZnG4FxMkP2xAvV');
  }

  sendEmail(to: string, subject: string, htmlContent: string) {
    return this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to: to,
      subject: subject,
      html: htmlContent
    });
  }
}
