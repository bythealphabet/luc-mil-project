import errorHandler from '../../helpers/dbErrorHandler';
import sgMail from '@sendgrid/mail';

import config from '../../../config/config';
import contactEmail from '../../email/email-templates/contactEmail';

sgMail.setApiKey(config.sendGridApiKey);

export const contact = async (req, res) => {
  const { name, email, comment } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'Please provide complete details',
    });
  }

  const msgToUser = {
    to: email,
    from: 'lucas@bythealphabet.com',
    subject: `Hi, ${name}, thank you for reaching to me`,
    html: contactEmail({ name }),
  };

  const msgToAdmin = {
    to: 'bythealphabet@gmail.com',
    from: 'lucas@bythealphabet.com',
    subject: `someone called ${name}, send you a message`,
    html: comment ? `${comment}"    "${name}"     "${email}` : 'No comment',
  };

  sgMail
    .send(msgToAdmin)
    .then(() => {
      return sgMail.send(msgToUser);
    })
    .then(() => {
      return res.status(200).json({
        message:
          'Thank you for contacting us we will contact you within 24hours',
        status: 'success',
        email,
      });
    })
    .catch(error => {
      console.log('error', error);
      return res
        .status(400)
        .json({ error: errorHandler.getErrorMessage(error) });
    });
};
