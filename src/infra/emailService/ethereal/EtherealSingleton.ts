import nodemailer from 'nodemailer';

export class EtherealSingleton {
  private static instance: EtherealSingleton;
  private transporter: nodemailer.Transporter;

  private constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'van.cole30@ethereal.email',
        pass: 'MgNtgkbdhbpPbpszYE',
      },
    });
  }
  static getInstance(): EtherealSingleton {
    if (!EtherealSingleton.instance) {
      EtherealSingleton.instance = new EtherealSingleton();
    }
    return EtherealSingleton.instance;
  }

  getTransporter(): nodemailer.Transporter {
    return this.transporter;
  }
}
