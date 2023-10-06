import fs from 'fs';
import path from 'path';

const livestreamingFolder = path.join(__dirname, 'livestreaming');
let fileCounter = 1;

export default async function handler(req, res) {
  try {
    console.log('Received request:', req.method, req.url);

    if (req.method === 'POST') {
      const { channelName } = req.body;
      console.log('Received channel name:', channelName);

      const logData = {
        userlive: {
          channelName,
          timestamp: new Date().toISOString(),
        },
      };

      if (!fs.existsSync(livestreamingFolder)) {
        fs.mkdirSync(livestreamingFolder, { recursive: true });
      }

      const fileName = `userlive${fileCounter}.json`;
      const filePath = path.join(livestreamingFolder, fileName);
      console.log('File path:', filePath);

      const logDataJson = JSON.stringify(logData, null, 2);

      fs.writeFile(filePath, logDataJson, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          res.status(500).json({ message: 'Error writing to file' });
        } else {
          console.log('Log saved to file:', fileName);
          res.status(200).json({ message: 'Channel name received and logged successfully' });
        }
      });

      fileCounter++;
    } else if (req.method === 'GET') {
      const { fileNumber } = req.query;
      const fileName = `userlive${fileNumber}.json`;

      const filePath = path.join(livestreamingFolder, fileName);

      if (!fs.existsSync(filePath)) {
        res.status(404).json({ message: 'File not found' });
        return;
      }

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).json({ message: 'Error reading file' });
        } else {
          try {
            const jsonData = JSON.parse(data);
            res.status(200).json(jsonData);
          } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            res.status(500).json({ message: 'Error parsing JSON' });
          }
        }
      });
    } else {
      const notAllowedResponse = {
        message: 'Method not allowed.',
      };

      res.status(405).json(notAllowedResponse);
    }
  } catch (error) {
    console.error('An error occurred while processing the request:', error);
    res.status(500).json({ message: 'An error occurred while processing the request.' });
  }
}
