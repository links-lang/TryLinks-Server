const fs = require('fs');

module.exports.getDescription = function (req, res, next) {
  const tutorialId = parseInt(req.body.tutorialId);
  let tutorialContent, tutorialDesc;

  if (isNaN(tutorialId)) {
    res.status(403).json({status: 'error', message: 'Unrecognizable tutorial number'});
    return;
  }

  fs.readFile(`tutorials/tutorial_${tutorialId}.json`, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({status: 'error', message: 'Cannot retrieve the tutorial\'s description'});
      return;
    }
    tutorialContent = JSON.parse(data);
    tutorialDesc = tutorialContent.description;

    if (tutorialDesc === undefined) {
      console.log('No description for a tutorial with ID: ' + tutorialId);
      res.status(500).json({status: 'error', message: 'Cannot retrieve the tutorial\'s description'});
      return;
    }

    res.status(200).json({
      status: 'success',
      description: tutorialDesc
    })
  })
};

module.exports.createTutorial = function (req, res, next) {
  const title = req.body.title;
  const description = req.body.description;
  const source = req.body.source;

  let latestId = 0;

  if (title === undefined || description === undefined || source === undefined) {
    res.status(400).json({status: 'error', message: 'The tutorial is required to have a title, description and source code.'});
    return;
  }

  // Read all tutorial files names to retrieve the latest id
  fs.readdir('tutorials', (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).json({status: 'error', message: 'Could not create a new tutorial'});
      return;
    }

    let nameRegEx = /^tutorial_(\d+)\.json$/;
    for (let fileName of files) {
      let match = fileName.match(nameRegEx);
      if (match != null) {
        let id = parseInt(match[1]);
        if (id > latestId) latestId = id;
      }
    }
    latestId++;

    const content = {
      title: title,
      description: description,
      source: source
    };

    fs.writeFile(`tutorials/tutorial_${latestId}.json`, JSON.stringify(content), (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({status: 'error', message: 'Could not create a new tutorial'});
        return;
      }

      res.status(200).json({status: 'success', message: `tutorial ${latestId} was successfully created`, tutorialId: latestId});
    })

  });

};