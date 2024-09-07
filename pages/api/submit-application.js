import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/forms.responses.write'],
    });

    const forms = google.forms({ version: 'v1', auth });
    const { groupName, description, contactEmail } = req.body;

    const response = await forms.forms.responses.create({
      formId: process.env.GOOGLE_FORM_ID,
      requestBody: {
        responses: [
          {
            textAnswers: {
              answers: [{ textValue: groupName }],
            },
            questionId: '343099708', // Replace with actual question ID for group name
          },
          {
            textAnswers: {
              answers: [{ textValue: description }],
            },
            questionId: '844680246', // Replace with actual question ID for description
          },
          {
            textAnswers: {
              answers: [{ textValue: contactEmail }],
            },
            questionId: '1391849460', // Replace with actual question ID for contact email
          },
        ],
      },
    });

    res.status(200).json({ message: 'Application submitted successfully', response });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
}